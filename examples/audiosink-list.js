#!/usr/bin/env node
/**
 * Lists all audioSinks as a table
 */
'use strict'
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    AsciiTable = require('ascii-table'),
    audioSinkId = parseInt(process.argv[2])

snowmix.connect()
.then(() => {
    let audioSinks = snowmix.audioSinks.all()
    if (audioSinks.length) {
        console.log(
            new AsciiTable()
            .setHeading('ID', 'Name', 'State', 'Channels', 'Muted?', 'Rate', 'Delay', 'Queues', 'Buffer size', 'Byte per sample', 'Signess')
            .addRowMatrix(audioSinks.map(f => { return [f.id, f.name, f.state, f.channels, f.muted, f.rate, f.delay, f.queues, f.bufferSize, f.bytePerSample, f.signess] }))
            .toString()
        )
    }
    else {
        console.log('There are no audioSinks')
    }
})
.finally(() => {
    return snowmix.close()
})
