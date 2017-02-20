#!/usr/bin/env node
'use strict'
/**
 * Creates an audioSink
 */
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    id = process.argv[2],
    name = process.argv[3]

snowmix.connect()
.then(() => {
    return snowmix.audioSinks.create({name: name, id: id})
}).then(audioSink => {
    console.log(`Created audioSink with id ${audioSink.id} and name '${audioSink.name}'`)
}).finally(() => {
    return snowmix.close()
})
