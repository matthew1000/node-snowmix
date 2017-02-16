#!/usr/bin/env node
'use strict'
/**
 * Add an AudioMixer to an AudioSink
 * Usage: audiosink-add-audiomixer.js <AudioSink ID> <AudioMixer ID>
 */
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    audioSinkId = process.argv[2],
    audioMixerId = process.argv[3]

if (!audioSinkId || !audioMixerId) {
    console.error('Please provide sink id and then an mixer id')
    process.exit(1)
}

snowmix.connect()
.then(() => {
    let audioSink = snowmix.audioSinks.byId(audioSinkId)
    if (!audioSink) throw new Error('No such AudioSink')
    return audioSink.addAudioMixer(audioMixerId)
}).then(() => {
    console.log(`Added AudioMixer ${audioMixerId} to AudioSink ${audioSinkId}.`)
}).finally(() => {
    return snowmix.close()
})
