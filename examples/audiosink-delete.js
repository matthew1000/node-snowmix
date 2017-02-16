#!/usr/bin/env node
'use strict'
/**
 * Deletes an audioSink
 */
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    id = process.argv[2]
if (!id) throw new Error('Please provide audioSink id as argument')

snowmix.connect()
.then(() => {
    let audioSink = snowmix.audioSinks.byId(id)
    if (!audioSink) throw new Error('Cannot find audioSink with id ' + id)
    return audioSink.delete()
}).then(() => {
    console.log(`Removed audioSink ${id}`)
}).finally(() => {
    return snowmix.close()
})
