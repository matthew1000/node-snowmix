'use strict'
const _ = require('lodash'),
      Promise = require('bluebird'),
      logger = require('./logger'),
      AudioMixer = require('./AudioMixer'),
      utils = require('./utils'),
      SnowmixItemCollection = require('./SnowmixItemCollection')

/**
 * Handles all audio mixers
 */
class AudioMixers extends SnowmixItemCollection {
    constructor(snowmix) {
        super(snowmix)
        this.itemName = AudioMixer
    }

    /**
     * Add a new audio mixer.
     * Of, if an audio mixer of the specified ID is provided, updates it.
     *
     * @param {object} containing 'name' (required) and 'id' (optional)
     * If omitted, id will be next highest value.
     */
    add(args) {
        return super.add(args)
    }

    /**
     * Runs when Snowmix is connected to discover all audiomixers.
     * @private
     */
    populate() {
        return this._parseAudioMixerAddCommand()
        .then(idsAndNames => {
            return this._parseAudioMixerSourceCommand()
            .then(sourceAudioFeeds => {
                return this._parseAudioMixerInfoCommand(idsAndNames, sourceAudioFeeds)
            })
        })
    }

    _parseAudioMixerAddCommand() {
        return this.snowmix.sendCommand('audio mixer add', { tidy: true, expectMultiline: true, logAtSillyLevel: true })
        .then(lines => {
            let idsAndNames = {}
            lines.forEach(l => {
                let match = l.match(/^\s*audio mixer\s*(\d+)\s*<(.+)>\s*$/)
                if (match) idsAndNames[parseInt(match[1])] = match[2]
            })

            return idsAndNames
        })
    }

    _parseAudioMixerSourceCommand() {
        return this.snowmix.sendCommand('audio mixer source', { tidy: true, expectMultiline: true, logAtSillyLevel: true })
        .then(lines => {
            let idsAndFeeds = {}
            lines.forEach(l => {
                let match = l.match(/^audio mixer (\d+) sourced by audio feed source id (\d+) av. samp. (\d+) = (\d+) ms, min\/max 0,0 ms, volume 1.000,1.000 (muted|unmuted), normal\s*$/)
                if (match) {
                    let audioMixerId = parseInt(match[1])
                    let audioFeedId = parseInt(match[2])
                    if (!idsAndFeeds[audioMixerId]) idsAndFeeds[audioMixerId] = {}
                    idsAndFeeds[audioMixerId][audioFeedId] = {
                        muted: match[3] === 'muted'
                    }
                }
                else {
                    logger.warn('Misunderstood response from audio mixer source:', l)
                }
            })

            return idsAndFeeds
        })
    }

    _parseAudioMixerInfoCommand(idsAndNames, sourceAudioFeeds) {
        return this.snowmix.sendCommand('audio mixer info', { tidy: true, expectMultiline: true, logAtSillyLevel: true })
        .then(lines => {
            lines.forEach(l => {
                let match

                if (l.match(/^\s*audio mixer info\s*$/)) return
                if (match = l.match(/^\s*audio mixers\s*:\s*(\d+)\s*$/)) return

                if (match = l.match(/^\s*max audio mixers\s*:\s*(\d+)\s*$/)) {
                    this.maxAudioMixers = match[1]
                    return
                }

                if (match = l.match(/^\s*verbose level\s*:\s*(\d+)\s*$/)) {
                    this.verboseLevel = match[1]
                    return
                }

                if (l.match(/^\s*audio mixer id : state, rate, channels, bytespersample, signess, volume, mute, buffersize, delay, queues\s*$/)) return

                if (match = l.match(/^[-\s]*audio mixer\s*(\d+)\s*:\s*(.+)$/)) {
                    let id = parseInt(match[1])
                    let details = match[2].split(', ')

                    if (!idsAndNames.hasOwnProperty(id)) {
                        logger.debug('AudioMixer %d is known by [audio mixer add] but not [audio mixer info], omitting', id)
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
                        audioFeeds: sourceAudioFeeds[id]
                    })
                    return
                }

                logger.warn('Misunderstood line in audio mixer info:', l)
            })
        })
    }
}

module.exports = AudioMixers