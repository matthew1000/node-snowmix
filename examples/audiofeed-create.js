#!/usr/bin/env node
'use strict'
/**
 * Creates an audioFeed
 */
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    id = process.argv[2],
    name = process.argv[3]

snowmix.connect()
.then(() => {
    return snowmix.audioFeeds.create({name: name, id: id})
}).then(audioFeed => {
    console.log(`Created audioFeed with id ${audioFeed.id} and name '${audioFeed.name}'`)
}).finally(() => {
    return snowmix.close()
})
