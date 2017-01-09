'use strict'
const _ = require('lodash'),
      Promise = require('bluebird'),
      logger = require('./logger'),
      AudioSink = require('./AudioSink'),
      utils = require('./utils')

/**
 * Handles all audio sinks
 */
class AudioSinks {
    constructor(snowmix) {
        this.snowmix = snowmix
        this.audiosinks = []
    }

    /**
     * Returns all audio sinks
     *
     * @return {array}}
     */
    all() {
        return this.audiosinks
    }

    /**
     * Returns all audio sink IDs
     *
     * @return {array} of integers
     */
    allIds() {
        return this.audiosinks.map(f => f.id)
    }

    /**
     * Get an audioSink by ID
     *
     * @param {integer} ID
     * @return {AudioSink} object
     */
    byId(id) {
        id = parseInt(id)
        return this.audiosinks.find(f => f.id === id)
    }

    /**
     * Returns next available ID.
     * e.g. if existing IDs used are [1,2,3,5] return 4, then 6.
     *
     * @return {integer}
     */
    getNextAvailableId() {
        return utils.findFirstHoleInSequence(this.allIds())
    }

    /**
     * Remove all audiosinks
     * @return {Promise}
     */
    removeAll() {
        return Promise.map(this.allIds(), id => { return this.byId(id).remove() })
    }

    removeAudioSinkFromInternalListOfAudioSinks(audioSink) {
        _.remove(this.audiosinks, a => a === audioSink)
    }

    /**
     * Add a new audio sink.
     * Of, if an audio sink of the specified ID is provided, updates it.
     *
     * @param {object} containing 'name' (required) and 'id' (optional)
     * If omitted, id will be next highest value.
     */
    add(args) {
        let audioSink = this._createOrUpdate(args)
        return audioSink.apply().return(audioSink)
    }

    _createOrUpdate(args) {
        let audioSink
        if (!_.isNil(args.id)) audioSink = this.byId(args.id)
        if (audioSink) { // update
            Object.assign(audioSink, args)
        }
        else { // create
            if (_.isNil(args.id)) args.id = this.getNextAvailableId()
            audioSink = new AudioSink(this.snowmix, args.id, args)
            this.audiosinks.push(audioSink)
        }

        return audioSink
    }

    /**
     * Runs when Snowmix is connected to discover all audiosinks.
     * @private
     */
    populate() {
        return this._parseAudioSinkAddCommand()
        .then((idsAndNames) => {
            return this._parseAudioSinkInfoCommand(idsAndNames)
        })
    }

    _parseAudioSinkAddCommand() {
        return this.snowmix.sendCommand('audio sink add', { tidy: true, expectMultiline: true, logAtSillyLevel: true })
        .then(lines => {
            let idsAndNames = {}
            lines.forEach(l => {
                let match = l.match(/^\s*audio sink\s*(\d+)\s*<(.+)>\s*$/)
                if (match) idsAndNames[parseInt(match[1])] = match[2]
            })

            return idsAndNames
        })
    }

    _parseAudioSinkInfoCommand(idsAndNames) {
        return this.snowmix.sendCommand('audio sink info', { tidy: true, expectMultiline: true, logAtSillyLevel: true })
        .then(lines => {
            lines.forEach(l => {
                let match

                if (l.match(/^\s*audio sink info\s*$/)) return
                if (match = l.match(/^\s*audio sinks\s*:\s*(\d+)\s*$/)) return

                if (match = l.match(/^\s*max audio sinks\s*:\s*(\d+)\s*$/)) {
                    this.maxAudioSinks = match[1]
                    return
                }

                if (match = l.match(/^\s*verbose level\s*:\s*(\d+)\s*$/)) {
                    this.verboseLevel = match[1]
                    return
                }

                if (l.match(/^\s*audio sink id : state, rate, channels, bytespersample, signess, volume, mute, buffersize, delay, queues\s*$/)) return

                if (match = l.match(/^[-\s]*audio sink\s*(\d+)\s*:\s*(.+)$/)) {
                    let id = parseInt(match[1])
                    let details = match[2].split(', ')

                    if (!idsAndNames.hasOwnProperty(id)) {
                        logger.debug('AudioSink %d is known by [audio sink add] but not [audio sink info], omitting', id)
                        return
                    }

                    this._createOrUpdate({
                        id: id,
                        name: idsAndNames[id],
                        state: details[0],
                        rate: details[1],
                        channels: details[2],
                        bytePerSample: details[3],
                        signess: details[4],
                        volume: details[5].split(','), // one value for each channel
                        muted: details[6] !== 'unmuted',
                        bufferSize: details[7],
                        delay: details[8],
                        queues: details[9],
                    })
                    return
                }

                logger.warn('Misunderstood line in audio sink info:', l)
            })
        })
    }
}

module.exports = AudioSinks
