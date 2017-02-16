#!/usr/bin/env node
'use strict'
/**
 * Add an AudioFeed to an AudioMixer
 * Usage: audiomixer-add-audiofeed.js <AudioMixer ID> <AudioFeed ID>
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
    if (!audioMixer) throw new Error('No such AudioMixer')
    return audioMixer.addAudioFeed(audioFeedId)
}).then(() => {
    console.log(`Added AudioFeed ${audioFeedId} to AudioMixer ${audioMixerId}.`)
}).finally(() => {
    return snowmix.close()
})
