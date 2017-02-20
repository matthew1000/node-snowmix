'use strict'
const _ = require('lodash'),
    Promise = require('bluebird'),
    logger = require('./logger'),
    SnowmixItem = require('./SnowmixItem')

/**
 * An single audio mixer.
 * Create with `showmix.audioMixers.create({ ... })`
 * An AudioMixer allows audio feeds to be mixed together, and then sent to
 * an AudioSink for output. You probably only have the need for one audio mixer.
 *
 * @extends SnowmixItem
 * @example let mixerName = snowmix.audioMixers.byId(1).name
 */
class AudioMixer extends SnowmixItem {

    constructor(snowmix, id, args) {
        super(snowmix)
        const defaults = {
            id: parseInt(id),
            name: 'AudioMixer #' + id,
            channels: 2,
            rate: 44100,
            signess: 'signed',
            audioFeeds: {}
        }
        _.defaults(this, args, defaults)
    }

    /**
     * Delete this audioMixer
     * @return {Promise}
     */
    delete() {
        this.snowmix.audioMixers.removeFromInternalList(this)
        return this.snowmix.sendCommand(`audio mixer add ${this.id}`, { tidy: true, expectResponse: false })
    }

    /**
     * Start the mixer. Will fail if there are no audioFeeds connected.
     * (which you can do with addAudioFeed() method.)
     * To tell if an AudioMixer is NOT started, check if 'state' is 'READY'
     * @return {Promise}
     */
    start() {
        return this.snowmix.sendCommand(`audio mixer start ${this.id}`, { tidy: true, expectResponse: false })
    }

    /**
     * Add an audioFeed to this mixer
     * @param {Integer} audioFeed ID
     * @return {Promise}
     */
    addAudioFeed(audioFeedId) {
        return this.snowmix.sendCommand(`audio mixer source feed ${this.id} ${audioFeedId}`, { tidy: true, expectResponse: false })
    }

    /**
     * Unmute an audiofeed at this mixer
     * @param {Integer} audioFeed ID
     * @return {Promise}
     */
    unmuteAudioFeed(audioFeedId) {
        return this.snowmix.sendCommand(`audio mixer source mute off ${this.id} ${audioFeedId}`, { tidy: true, expectResponse: false })
    }

    /**
     * Mute an audiofeed at this mixer
     * @param {Integer} audioFeed ID
     * @return {Promise}
     */
    muteAudioFeed(audioFeedId) {
        return this.snowmix.sendCommand(`audio mixer source mute on ${this.id} ${audioFeedId}`, { tidy: true, expectResponse: false })
    }

    /**
     * Ensures the audioFeed(s) provided are the only ones that aren't muted
     * @param {Array} of audioFeed IDs
     * @return {Promise}
     */
    switchToAudioFeeds(audioFeedIds) {
        audioFeedIds = audioFeedIds.map(id => parseInt(id))
        let commands = []
        /*eslint no-unused-vars: ["error", { "varsIgnorePattern": "audioFeedDetails|Promise|logger" }]*/
        _.forEach(this.audioFeeds, (audioFeedDetails, audioFeedId) => {
            let onOrOff = audioFeedIds.indexOf(parseInt(audioFeedId)) === -1 ? 'on' : 'off'
            commands.push(`audio mixer source mute ${onOrOff} ${this.id} ${audioFeedId}`)
        })
        return this.snowmix.sendCommand(commands, { tidy: true, expectResponse: false })
        .then(() => {
            // Not great, but re-populating gets this.audioFeeds right after the change
            return this.snowmix.audioMixers.populate()
        })
    }

    apply() {
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
