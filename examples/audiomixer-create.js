#!/usr/bin/env node
'use strict'
/**
 * Creates an audioMixer
 */
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    id = process.argv[2],
    name = process.argv[3]

snowmix.connect()
.then(() => {
    return snowmix.audioMixers.create({name: name, id: id})
}).then(audioMixer => {
    console.log(`Created audioMixer with id ${audioMixer.id} and name '${audioMixer.name}'`)
}).finally(() => {
    return snowmix.close()
})
