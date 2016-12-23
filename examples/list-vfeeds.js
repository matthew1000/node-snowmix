#!/usr/bin/env node
/**
 * Lists all vfeeds as a table
 */
'use strict'
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    AsciiTable = require('ascii-table'),
    vfeedId = parseInt(process.argv[2])

snowmix.connect()
.then(() => {
    let vfeeds = snowmix.vfeeds.all()
    if (vfeeds.length) {
        console.log(vfeeds)
        console.log(
            new AsciiTable()
            .setHeading('ID', 'Name', 'State', 'Source type', 'Source ID', 'Geometry', 'Scale', 'Clip coordinates', 'Clip geometry')
            .addRowMatrix(vfeeds.map(f => { return [f.id, f.name, f.state, f.source, f.sourceId, f.geometry, f.scale, f.clipCoordinates, f.clipGeometry] }))
            .toString()
        )
    }
    else {
        console.log('There are no vfeeds')
    }
})
.finally(() => {
    return snowmix.close()
})
