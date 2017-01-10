#!/usr/bin/env node
/**
 * Lists all audioMixers as a table
 */
'use strict'
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    AsciiTable = require('ascii-table'),
    _ = require('lodash'),
    audioMixerId = parseInt(process.argv[2])

snowmix.connect()
.then(() => {
    let audioMixers = snowmix.audioMixers.all()
    if (audioMixers.length) {
        console.log(
            new AsciiTable()
            .setHeading('ID', 'Name', 'State', 'Channels', 'Muted?', 'Rate', 'Delay', 'Queues', 'Buffer size', 'Byte per sample', 'Signess', 'Audio feed IDs')
            .addRowMatrix(audioMixers.map(f => { return [f.id, f.name, f.state, f.channels, f.muted, f.rate, f.delay, f.queues, f.bufferSize, f.bytePerSample, f.signess, Object.keys(f.audioFeeds).join(',')]}))
            .toString()
        )
    }
    else {
        console.log('There are no audioMixers')
    }
})
.finally(() => {
    return snowmix.close()
})
