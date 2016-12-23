#!/usr/bin/env node
/**
 * Lists all feeds as a table
 */
'use strict'
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    AsciiTable = require('ascii-table'),
    vfeedId = parseInt(process.argv[2])

snowmix.connect()
.then(() => {
    let feeds = snowmix.feeds.all()
    if (feeds.length) {
        console.log(
            new AsciiTable()
            .setHeading('ID', 'Name', 'State', 'Geometry', 'Is Live?', 'Socket', 'Frames', 'Dropped', 'Missed')
            .addRowMatrix(feeds.map(f => { return [f.id, f.name, f.state, f.geometry, f.live, f.socket, f.frames, f.dropped, f.missed] }))
            .toString()
        )
    }
    else {
        console.log('There are no feeds')
    }
})
.finally(() => {
    return snowmix.close()
})
