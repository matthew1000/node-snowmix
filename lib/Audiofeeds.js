'use strict'
const _ = require('lodash'),
      Promise = require('bluebird'),
      logger = require('./logger'),
      Audiofeed = require('./Audiofeed'),
      utils = require('./utils')

/**
 * Handles all audio feeds
 */
class Audiofeeds {
    constructor(snowmix) {
        this.snowmix = snowmix
        this.audiofeeds = []
    }

    /**
     * Returns all audio feeds
     *
     * @return {array}}
     */
    all() {
        return this.audiofeeds
    }

    /**
     * Returns all audiofeed IDs
     *
     * @return {array} of integers
     */
    allIds() {
        return this.audiofeeds.map(f => f.id)
    }

    /**
     * Get an audiofeed by ID
     *
     * @param {integer} ID
     * @return {Audiofeed} object
     */
    byId(id) {
        return this.audiofeeds[id]
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
     * Add a new audio feed.
     * Of, if an audio feed of the specified ID is provided, updates it.
     *
     * @param {object} containing 'name' (required) and 'id' (optional)
     * If omitted, id will be next highest value.
     */
    addOrUpdate(args) {
        let audiofeed
        if (args.hasOwnProperty('id')) audiofeed = this.byId(args.id)
        if (audiofeed) { // update
            Object.assign(audiofeed, args)
        }
        else { // create
            if (!args.hasOwnProperty('id')) args.id = this.getNextAvailableId()
            audiofeed = new Audiofeed(this.snowmix, args.id, args)
            this.audiofeeds.push(audiofeed)
        }

        return audiofeed
    }

    /**
     * Populates the information known about feeds from Snowmix
     * Run automatically when Snowmix is first connected.
     * @private
     */
    populate() {
        let feedId
        let feeds = []
        return this.snowmix.sendCommand('audio feed info', { tidy: true, expectMultiline: true, logAtSillyLevel: true })
        .then(lines => {
            lines.forEach(l => {
                let match

                if (l.match(/^\s*audio feed info\s*$/)) return
                if (match = l.match(/^\s*audio feeds\s*:\s*(\d+)\s*$/)) return

                if (match = l.match(/^\s*max audio feeds\s*:\s*(\d+)\s*$/)) {
                    this.maxAudiofeeds = match[1]
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
                    this.addOrUpdate({
                        id: id,
                        state: details[0],
                        rate: details[1],
                        channels: details[2],
                        bytePerSample: details[3],
                        signess: details[4],
                        volume: details[5].split(','), // one value for each channel
                        mute: details[6],
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

module.exports = Audiofeeds
