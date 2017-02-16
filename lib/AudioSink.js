'use strict'
const _ = require('lodash'),
    Promise = require('bluebird'),
    logger = require('./logger'),
    SnowmixItem = require('./SnowmixItem')

/**
 * An single audio sink
 *
 * @extends SnowmixItem
 * @example let sinkName = snowmix.audioSinks.byId(1).name
 */
class AudioSink extends SnowmixItem {

    constructor(snowmix, id, args) {
        super(snowmix)
        const defaults = {
            id: parseInt(id),
            name: 'AudioSink #' + id,
            channels: 2,
            rate: 44100,
            signess: 'signed'
        }
        _.defaults(this, args, defaults)
    }

    /**
     * Delete this audioSink
     * @return {Promise}
     */
    delete() {
        this.snowmix.audioSinks.removeFromInternalList(this)
        return this.snowmix.sendCommand(`audio sink add ${this.id}`, { tidy: true, expectResponse: false })
    }

    /**
     * Add an audioMixer to this sink
     * @param {Integer} audioMixer ID
     * @return {Promise}
     */
    addAudioMixer(audioMixerId) {
        return this.snowmix.sendCommand(`audio sink source mixer ${this.id} ${audioMixerId}`, { tidy: true, expectResponse: false })
    }

    apply() {
        let createCommands = [
            `audio sink add ${this.id} ${this.name}`,
            `audio sink channels ${this.id} ${this.channels}`,
            `audio sink rate ${this.id} ${this.rate}`,
            `audio sink format ${this.id} 16 ${this.signess}`,
            `audio sink mute off ${this.id}`,
        ]

        return this.snowmix.sendCommand(createCommands, { tidy: true, expectResponse: false })
    }
}

module.exports = AudioSink
