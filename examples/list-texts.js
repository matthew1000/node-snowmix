#!/usr/bin/env node
/**
 * Lists all texts
 */
'use strict'
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    AsciiTable = require('ascii-table'),
    vfeedId = parseInt(process.argv[2])

snowmix.connect()
.then(() => {
    let texts = snowmix.texts.all()
    if (texts.length) {
        console.log(
            new AsciiTable()
            .setHeading('ID', 'String', 'Font ID', 'Anchor', 'Offset')
            .addRowMatrix(texts.map(f => { return [f.id, f.string, f.fontId, f.anchor, f.offset] }))
            .toString()
        )
    }
    else {
        console.log('There are no texts')
    }
})
.finally(() => {
    return snowmix.close()
})
