#!/usr/bin/env node
/**
 * Lists all audioFeeds as a table
 */
'use strict'
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    AsciiTable = require('ascii-table'),
    audioFeedId = parseInt(process.argv[2])

snowmix.connect()
.then(() => {
    let audioFeeds = snowmix.audioFeeds.all()
    if (audioFeeds.length) {
        console.log(
            new AsciiTable()
            .setHeading('ID', 'Name', 'State', 'Channels', 'Muted?', 'Rate', 'Delay', 'Queues', 'Buffer size', 'Byte per sample', 'Signess')
            .addRowMatrix(audioFeeds.map(f => { return [f.id, f.name, f.state, f.channels, f.muted, f.rate, f.delay, f.queues, f.bufferSize, f.bytePerSample, f.signess] }))
            .toString()
        )
    }
    else {
        console.log('There are no audioFeeds')
    }
})
.finally(() => {
    return snowmix.close()
})
