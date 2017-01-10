#!/usr/bin/env node
'use strict'
/**
 * Creates an audioMixer
 */
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    audioMixerId = process.argv[2],
    audioFeedIds = process.argv.slice(3)

snowmix.connect()
.then(() => {
    console.log(123, audioMixerId, audioFeedIds, typeof(audioFeedIds))
    let audioMixer = snowmix.audioMixers.byId(audioMixerId)
    if (!audioMixer) throw new Error('No such audioMixer')
    return audioMixer.switchToAudioFeeds(audioFeedIds)
}).then(() => {
    console.log(`Switched audioMixer ${audioMixerId} to have feeds [${audioFeedIds.join(',')}] only unmuted.`)
}).finally(() => {
    return snowmix.close()
})
