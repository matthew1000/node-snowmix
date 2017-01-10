#!/usr/bin/env node
/**
 * Allows the user to swich to a feed
 */
'use strict'
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    AsciiTable = require('ascii-table'),
    feedId = parseInt(process.argv[2])

if (!feedId) {
    console.error('Please provide a feed ID')
    process.exit(1)
}

snowmix.connect()
.then(() => {
    let feed = snowmix.feeds.byId(feedId)
    if (feed) {
        return feed.switch().then(() => {
            console.log('Done')
        })
    }
    else {
        console.log('No such feed')
    }
})
.then(() => {
    return snowmix.close()
})
