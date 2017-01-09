'use strict'
const _ = require('lodash'),
      Promise = require('bluebird'),
      logger = require('./logger')

/**
 * An single audio mixer
 * @example let mixerName = snowmix.audioMixers.byId(1).name
 */
class AudioMixer {

    constructor(snowmix, id, args) {
        this.snowmix = snowmix
        const defaults = {
            id: parseInt(id),
            name: 'AudioMixer #' + id,
            channels: 2,
            rate: 44100,
            signess: 'signed'
        }
        _.defaults(this, args, defaults)
    }

    /**
     * Remove this audioMixer from Snowmix
     * @return {Promise}
     */
    remove() {
        this.snowmix.audioMixers.removeAudioMixerFromInternalListOfAudioMixers(this)
        return this.snowmix.sendCommand(`audio mixer add ${this.id}`, { tidy: true, expectResponse: false })
    }


    apply() {
        let initialVolume = 1
        let createCommands = [
            `audio mixer add ${this.id} ${this.name}`,
            `audio mixer channels ${this.id} ${this.channels}`,
            `audio mixer rate ${this.id} ${this.rate}`,
            `audio mixer mute off ${this.id}`,
            // `audio mixer volume ${this.id} ${initialVolume}`
        ]

        return this.snowmix.sendCommand(createCommands, { tidy: true, expectResponse: false })
    }
}

module.exports = AudioMixer
