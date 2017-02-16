#!/usr/bin/env node
'use strict'
/**
 * Start an AudioMixer
 * Usage: audiomixer-start.js <audioMixerId>
 */
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    audioMixerId = process.argv[2]

if (!audioMixerId) {
    console.error('Please provide mixer id')
    process.exit(1)
}

snowmix.connect()
.then(() => {
    let audioMixer = snowmix.audioMixers.byId(audioMixerId)
    if (!audioMixer) throw new Error('No such audioMixer')
    return audioMixer.start()
}).then(() => {
    console.log(`Started audioMixer ${audioMixerId}.`)
}).finally(() => {
    return snowmix.close()
})
