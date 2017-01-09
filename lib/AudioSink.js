'use strict'
const _ = require('lodash'),
      Promise = require('bluebird'),
      logger = require('./logger')

/**
 * An single audio sink
 * @example let sinkName = snowmix.audioSinks.byId(1).name
 */
class AudioSink {

    constructor(snowmix, id, args) {
        this.snowmix = snowmix
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
     * Remove this audioSink from Snowmix
     * @return {Promise}
     */
    remove() {
        this.snowmix.audioSinks.removeAudioSinkFromInternalListOfAudioSinks(this)
        return this.snowmix.sendCommand(`audio sink add ${this.id}`, { tidy: true, expectResponse: false })
    }


    apply() {
        let initialVolume = 1
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
