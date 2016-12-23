#!/usr/bin/env node
/**
 * Allows the user to swich to a vfeed
 * If no vfeed id is provided as argument, displays them all
 */
'use strict'
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    AsciiTable = require('ascii-table'),
    vfeedId = parseInt(process.argv[2])

snowmix.connect()
.then(() => {
    if (vfeedId) {
        let vfeed = snowmix.vfeeds.byId(vfeedId)
        if (vfeed) {
            return vfeed.switch().then(() => {
                console.log('Done')
            })
        }
        else {
            console.log('No such vfeed')
        }
    }
    else {
        let vfeeds = snowmix.vfeeds.all()
        if (vfeeds.length) {
            console.log('Provide the ID of the vfeed to show. Options are:\n' +
                new AsciiTable()
                .setHeading('ID', 'State', 'Source', 'Source ID', 'Coordinates', 'Geometry', 'Scale')
                .addRowMatrix(vfeeds.map(f => { return [f.id, f.state, f.source, f.sourceId, f.coors, f.geometry, f.scale] }))
                .toString()
            )
        }
        else {
            console.log('No vfeeds defined!')
        }
    }
})
.then(() => {
    return snowmix.close()
})
