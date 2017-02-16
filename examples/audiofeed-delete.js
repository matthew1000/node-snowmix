#!/usr/bin/env node
'use strict'
/**
 * Deletes an AudioFeed
 */
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    id = process.argv[2]
if (!id) throw new Error('Please provide audioFeed id as argument')

snowmix.connect()
.then(() => {
    let audioFeed = snowmix.audioFeeds.byId(id)
    if (!audioFeed) throw new Error('Cannot find audioFeed with id ' + id)
    return audioFeed.delete()
}).then(() => {
    console.log(`Removed audioFeed ${id}`)
}).finally(() => {
    return snowmix.close()
})
