#!/usr/bin/env node
/**
 * Allows the user to swich to a vfeed
 */
'use strict'
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    AsciiTable = require('ascii-table'),
    vfeedId = parseInt(process.argv[2])

if (!vfeedId) {
    console.error('Please provide a vfeed ID')
    process.exit(1)
}

snowmix.connect()
.then(() => {
    let vfeed = snowmix.vfeeds.byId(vfeedId)
    if (vfeed) {
        return vfeed.switch().then(() => {
            console.log('Done')
        })
    }
    else {
        console.log('No such vfeed')
    }
})
.then(() => {
    return snowmix.close()
})
