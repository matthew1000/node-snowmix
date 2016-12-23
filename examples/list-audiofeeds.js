#!/usr/bin/env node
/**
 * Lists all audiofeeds as a table
 */
'use strict'
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    AsciiTable = require('ascii-table'),
    audiofeedId = parseInt(process.argv[2])

snowmix.connect()
.then(() => {
    let audiofeeds = snowmix.audiofeeds.all()
    if (audiofeeds.length) {
        console.log(
            new AsciiTable()
            .setHeading('ID', 'Name', 'State', 'Channels', 'Muted?', 'Rate', 'Delay', 'Queues', 'Buffer size', 'Byte per sample')
            .addRowMatrix(audiofeeds.map(f => { return [f.id, f.name, f.state, f.channels, f.muted, f.rate, f.delay, f.queues, f.bufferSize, f.bytePerSample] }))
            .toString()
        )
    }
    else {
        console.log('There are no audiofeeds')
    }
})
.finally(() => {
    return snowmix.close()
})
