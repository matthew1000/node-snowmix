'use strict'
const _ = require('lodash'),
      Promise = require('bluebird'),
      logger = require('./logger'),
      AudioFeed = require('./AudioFeed'),
      utils = require('./utils'),
      SnowmixItemCollection = require('./SnowmixItemCollection')

/**
 * Handles all audio feeds
 *
 * @extends SnowmixItemCollection
 */
class AudioFeeds extends SnowmixItemCollection {
    constructor(snowmix) {
        super(snowmix)
        this.itemName = AudioFeed
    }

    /**
     * Add a new audio feed.
     * Of, if an audio feed of the specified ID is provided, updates it.
     *
     * @param {object} containing 'name' (required) and 'id' (optional)
     * If omitted, id will be next highest value.
     */
    add(args) {
        return super.add(args, true)
    }

    /**
     * Runs when Snowmix is connected to discover all audioFeeds.
     * @private
     */
    populate() {
        return this._parseAudioFeedAddCommand()
        .then((idsAndNames) => {
            return this._parseAudioFeedInfoCommand(idsAndNames)
        })
    }

    _parseAudioFeedAddCommand() {
        return this.snowmix.sendCommand('audio feed add', { tidy: true, expectMultiline: true, logAtSillyLevel: true })
        .then(lines => {
            let idsAndNames = {}
            lines.forEach(l => {
                let match = l.match(/^\s*audio feed\s*(\d+)\s*<(.+)>\s*$/)
                if (match) idsAndNames[parseInt(match[1])] = match[2]
            })

            return idsAndNames
        })
    }

    _parseAudioFeedInfoCommand(idsAndNames) {
        return this.snowmix.sendCommand('audio feed info', { tidy: true, expectMultiline: true, logAtSillyLevel: true })
        .then(lines => {
            lines.forEach(l => {
                let match

                if (l.match(/^\s*audio feed info\s*$/)) return
                if (match = l.match(/^\s*audio feeds\s*:\s*(\d+)\s*$/)) return

                if (match = l.match(/^\s*max audio feeds\s*:\s*(\d+)\s*$/)) {
                    this.maxAudioFeeds = match[1]
                    return
                }

                if (match = l.match(/^\s*verbose level\s*:\s*(\d+)\s*$/)) {
                    this.verboseLevel = match[1]
                    return
                }

                if (l.match(/^\s*audio feed id : state, rate, channels, bytespersample, signess, volume, mute, buffersize, delay, queues\s*$/)) return

                if (match = l.match(/^[-\s]*audio feed\s*(\d+)\s*:\s*(.+)$/)) {
                    let id = parseInt(match[1])
                    let details = match[2].split(', ')

                    if (!idsAndNames.hasOwnProperty(id)) {
                        logger.debug('AudioFeed %d is known by [audio feed add] but not [audio feed info], omitting', id)
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

                logger.warn('Misunderstood line in audio feed info:', l)
            })
        })
    }
}

module.exports = AudioFeeds
