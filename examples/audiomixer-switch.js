#!/usr/bin/env node
'use strict'
/**
 * Switch an AudioMixer to one or more AudioFeeds
 * Usage: audiomixer-switch.js <audioMixerId> <audioFeedId>...
 */
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    audioMixerId = process.argv[2],
    audioFeedIds = process.argv.slice(3)

if (!audioMixerId || !audioFeedIds.length) {
    console.error('Please provide mixer id and then 1 or more audio feed ids')
    process.exit(1)
}

snowmix.connect()
.then(() => {
    let audioMixer = snowmix.audioMixers.byId(audioMixerId)
    if (!audioMixer) throw new Error('No such audioMixer')
    return audioMixer.switchToAudioFeeds(audioFeedIds)
}).then(() => {
    console.log(`Switched audioMixer ${audioMixerId} to have feeds [${audioFeedIds.join(',')}] only unmuted.`)
}).finally(() => {
    return snowmix.close()
})
