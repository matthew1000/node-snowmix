#!/usr/bin/env node
'use strict'
/**
 * A full example.
 * Creates two AV feeds, and switches between them every three seconds.
 */
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    audioMixerId = process.argv[2],
    audioFeedId = process.argv[3]

if (!audioMixerId || !audioFeedId) {
    console.error('Please provide mixer id and then an audio feed id')
    process.exit(1)
}

snowmix.connect()
.then(() => {
    let audioMixer = snowmix.audioMixers.byId(audioMixerId)
    if (!audioMixer) throw new Error('No such audioMixer')
    return audioMixer.addAudioFeed(audioFeedId)
}).then(() => {
    console.log(`Added ${audioFeedId} to audioMixer ${audioMixerId}.`)
}).finally(() => {
    return snowmix.close()
})
