#!/usr/bin/env node
'use strict'
/**
 * Creates a feed
 */
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    id = process.argv[2],
    name = process.argv[3]

snowmix.connect()
.then(() => {
    return snowmix.feeds.add({name : name, id: id})
}).then(feed => {
    console.log(`Created feed with id ${feed.id} and name '${feed.name}'`)
}).finally(() => {
    return snowmix.close()
})
