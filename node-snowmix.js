'use strict'
const net = require('net'),
      Promise = require('bluebird'),
      SnowmixTexts = require('./lib/Texts'),
      SnowmixFeeds = require('./lib/Feeds'),
      SnowmixVfeeds = require('./lib/Vfeeds'),
      SnowmixImages = require('./lib/Images'),
      SnowmixImagePlaces = require('./lib/ImagePlaces'),
      SnowmixAudioFeeds = require('./lib/AudioFeeds'),
      SnowmixAudioMixers = require('./lib/AudioMixers'),
      SnowmixAudioSinks = require('./lib/AudioSinks'),
      SnowmixGeneral = require('./lib/General'),
      SnowmixSystemInfo = require('./lib/SystemInfo'),
      SnowmixCommands = require('./lib/Commands'),
      _ = require('lodash'),
      logger = require('./lib/logger')

const defaultValues = {
    port: 9999,
    host: '127.0.0.1',
}

let singletons = {}

/**
 * Snowmix Constructor.
 * Ensures the same instance is used for each host/port
 *
 * Optional arguments as object: port, host
 * @example let snowmix = Snowmix.new()
 * @example let snowmix = Snowmix.new({ port: 1234, host: 'example.com' })
 */
exports.new = (host, port) => {
    if (!host || host === 'localhost') host = '127.0.0.1'
    if (!port) port = 9999
    if (!singletons[host]) singletons[host] = {}
    if (!singletons[host][port]) singletons[host][port] = new Snowmix({host: host, port: port})
    return singletons[host][port]
}

/**
 * The main Snowmix class. Use snowmix.new() to construct.
 */
class Snowmix {
    constructor() {
        _.defaults(this, defaultValues)
        this.general    = new SnowmixGeneral(this)
        this.systemInfo = new SnowmixSystemInfo(this)
        this.commands   = new SnowmixCommands(this)
        this.feeds      = new SnowmixFeeds(this)
        this.vfeeds     = new SnowmixVfeeds(this)
        this.images     = new SnowmixImages(this)
        this.imagePlaces= new SnowmixImagePlaces(this)
        this.audioFeeds = new SnowmixAudioFeeds(this)
        this.audioMixers= new SnowmixAudioMixers(this)
        this.audioSinks = new SnowmixAudioSinks(this)
        this.texts      = new SnowmixTexts(this)
        this.commandsQueue = []
    }

    /**
     * Connect to Snowmix
     *
     * @example snowmix.connect().then(() => { snowmix.sendCommand(...) }
     */
    connect() {

        if (this.closing) {
            throw new Error('Attempting to connect whilst closing. Are you sure you have got your promises right?')
        }

        // Don't allow multiple connections at once:
        if (this.connecting) {
            if (this.connectingLoopCount++ > 1000) throw new Error('Stuck in connecting state!')
            return Promise.resolve().delay(20).then(() => {
                return this.connect()
            })
        }

        this.connecting = true
        this.connectingLoopCount = 0

        if (this.client) {
            if (!this.client.destroyed) return Promise.resolve() // already connected
            delete this.client
        }

        return new Promise((resolve, reject) => {

            this.client = new net.Socket()
            this.client.on('close', () => {
                if (this.closing) {
                    logger.debug('Connection to Snowmix closed')
                    this.closing = false
                    if (this.onCloseCallbacks) this.onCloseCallbacks.forEach(f => { f() })
                }
                else {
                    logger.warn('Connection to Snowmix closed')
                }
            });

            this.client.connect(this.port, this.host, () => {
                const handleResponse = response => {
                    this.connecting = false
                    response = response.toString()
                    if (!response.match(/^Snowmix version [\d.]+\s*$/)) {
                        throw new Error(`Misunderstood connection response: '${response}'`)
                    }

                    logger.debug('Connected to Snowmix on port', this.port)

                    // Change to standard data handler now that we're connected
                    this.client.removeListener('data', handleResponse)
                    this.client.on('data', data => {
                        return this.onData(data)
                    })

                    resolve()
                }
                this.client.on('data', handleResponse)
            })
        })
        .then(() => {
            // This must be done first, before ensureVerboseOn
            return this.systemInfo.populate()
        })
        .then(() => {
            // This must be done second, before we populate other objects
            return this.general.ensureVerboseOn()
        })
        .then(() => {
            return this.populate()
        })
    }

    /**
     * Handle Snowmix response.
     * @private
     */
    onData(data) {
        data = data.toString()

        if (this.commandsQueue.length === 0) {
            logger.warn('Unrecognised message from Snowmix:', data)
            return
        }
        let commandInFlight = this.commandsQueue[0]

        if (this.previousData) data = this.previousData + data

        let isIncomplete = looksLikeMoreToCome(data, commandInFlight.args)

        let logMsg = (isIncomplete ? 'INCOMPLETE ' : '') +
            'response from Snowmix ---\n' + data + '\n---END of response from Snowmix'
        commandInFlight.args.logAtSillyLevel ? logger.silly(logMsg) : logger.debug(logMsg)

        if (isIncomplete) {
            this.previousData = data
            return
        }

        this.commandsQueue.shift() // remove the command, it's done
        delete this.previousData
        commandInFlight.responseHandler(data)
        this.sendNextMessageInQueue() // we can now ask Snowmix for the next thing
    }

    /**
     * Close the connection to Snowmix. (Does not stop Snowmix.)
     *
     * @example snowmix.close().then(() => { console.log('All done') })
     */
    close() {
        if (!this.client || this.client.destroyed) return Promise.resolve()
        this.closing = true
        return new Promise(resolve => {
            if (!this.onCloseCallbacks) this.onCloseCallbacks = []
            this.onCloseCallbacks.push(resolve)
            this.client.end()
        })
    }

    /**
     * Populates the information known about feeds, virtual feeds and texts from Snowmix.
     */
    populate() {
        return this.feeds.populate()
        .then(() => { return this.vfeeds.populate() })
        .then(() => { return this.audioFeeds.populate() })
        .then(() => { return this.audioFeeds.populate() })
        .then(() => { return this.audioMixers.populate() })
        .then(() => { return this.audioSinks.populate() })
        .then(() => { return this.texts.populate() })
        .then(() => { return this.images.populate() })
        .then(() => { return this.imagePlaces.populate() })
        .then(() => { return this.commands.populateFromShowCommand() })
        .then(() => {
            logger.info(`There are `,
                        `${this.feeds.all().length} video feeds, `,
                        `${this.vfeeds.all().length} video vfeeds, `,
                        `${this.audioFeeds.all().length} audio feeds, `,
                        `${this.audioMixers.all().length} audio mixers, `,
                        `${this.audioSinks.all().length} audio sinks, `,
                        `${this.images.all().length} images, `,
                        `${this.imagePlaces.all().length} image places, `,
                        `${this.texts.all().length} texts`)
        })
    }

    /**
     * Send a command, or array of commands, to Snowmix.
     * Optional arguments:
     *   set 'expectResponse' to false if no response is expected.
     *    (note very few don't set a response when in verbose mode, which this library enables automatically)
     *   set 'expectMultiline' to true if the command returns multiple lines
     *    (if not set, some lines may be missed)
     *
     * @param {string_or_array} commands
     * @param {object} arguments
     */
    sendCommand(cmd, args) {
        if (this.client && this.client.writable && !this.connecting) return this._command(cmd, args)
        return this.connect().then(() => { return this._command(cmd, args) })
    }

    _command(cmd, args) {
        if (!this.r) this.r = Math.random()
        return new Promise((resolve, reject) => {
            // commandsQueue ensures we only run one command at once
            this.commandsQueue.push({ cmd: cmd, responseHandler: resolve, args: args||{} })
            this.sendNextMessageInQueue()
        })
        .then(response => {
            if (response && args && args.tidy) return splitLinesAndTidy(response)
            return response
        })
    }

    /**
     * Sends the next command in the queue to Snowmix, if the current message at the top has completed.
     * (And most of the time, completed means that a response has been received from Snowmix.)
     * @private
     */
    sendNextMessageInQueue() {
        if (!this.commandsQueue.length) return
        let command = this.commandsQueue[0]

        // This next line ensures that we don't send a second command until a
        // response from the first has been reveived:
        if (command.sent) return

        if (Array.isArray(command.cmd)) {
            logger.debug(`Sending ${command.cmd.length} commands:\n` + command.cmd.map(c => { return `  [${c}]\n`}).join(''))
            command.cmd = command.cmd.map(c => c + '\n').join('')
        }
        else {
            logger.debug(`Sending command: [${command.cmd}]`)
            command.cmd = `${command.cmd}\n`
        }

        command.sent = true
        this.client.write(command.cmd)

        if (command.args.expectResponse === false) {
            this.commandsQueue.shift()
            command.responseHandler()
            this.sendNextMessageInQueue() // time to do next message
        }
    }
}

function splitLinesAndTidy(data) {
    if (data.length === 0) return []
    data = data
    .split('\n')
    .map(l => { return l.replace(/^(MSG|STAT):\s*/, '') })

    while (data[data.length-1] === '')  data.pop()
    return data
}

/**
 * Analyses response from Snowmix to determine if it is complete or not.
 * Based on rules at https://sourceforge.net/p/snowmix/discussion/Snowmix_Support_Forum/thread/b607c533/
 * @private
 */
function looksLikeMoreToCome(data, args) {
    if (!args.expectMultiline) return false
    if (data.match(/invalid/i)) return false

    let matches = data.match(/.*(MSG|STAT):\s*([^\n]*?)[\s\n]*$/)

    if (!matches) return false
    let lineContents = matches[2]
    if (lineContents === '') return false
    return true
}
