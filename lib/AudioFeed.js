'use strict'
const _ = require('lodash'),
      Promise = require('bluebird'),
      logger = require('./logger'),
      SnowmixItem = require('./SnowmixItem')

/**
 * An single audio feed. Use AudioFeeds to create and delete.
 *
 * @example let feedName = snowmix.audioFeeds.byId(1).name
 * @property {integer} id
 * @property {string} name
 * @property {string} state
 * @property {integer} channels
 * @property {boolean} muted
 * @property rate
 * @property delay
 * @property queues
 * @property bufferSize
 * @property bytePerSample
 * @property {string} signess (signed | unsigned | float)
 */
class AudioFeed extends SnowmixItem {

    constructor(snowmix, id, args) {
        super(snowmix)
        const defaults = {
            id: parseInt(id),
            name: 'AudioFeed #' + id,
            channels: 2,
            rate: 44100,
            signess: 'signed'
        }
        _.defaults(this, args, defaults)
    }

    /**
     * Remove this audioFeed from Snowmix
     * @return {Promise}
     */
    remove() {
        this.snowmix.audioFeeds.removeFromInternalList(this)
        return this.snowmix.sendCommand(`audio feed add ${this.id}`, { tidy: true, expectResponse: false })
    }

    apply() {
        let initialVolume = 1
        let createCommands = [
            `audio feed add ${this.id} ${this.name}`,
            `audio feed channels ${this.id} ${this.channels}`,
            `audio feed rate ${this.id} ${this.rate}`,
            `audio feed format ${this.id} 16 ${this.signess}`,
            `audio feed mute off ${this.id}`,
            // `audio feed volume ${this.id} ${initialVolume}`
        ]

        return this.snowmix.sendCommand(createCommands, { tidy: true, expectResponse: false })
    }
}

module.exports = AudioFeed
