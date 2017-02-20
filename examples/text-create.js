#!/usr/bin/env node
'use strict'
/**
 * Creates or updates a text and shows it on the video
 */
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    AsciiTable = require('ascii-table'),
    id = process.argv[2],
    textString = process.argv[3]

if (!textString) throw new Error('Please provide a id then string as argument')

snowmix.connect()
.then(() => {
    return snowmix.texts.add({ string : textString, id: id, green: 1, blue: 0, red: 1, fontSize: 90 })
    .then(text => {
        return text.show()
    })
}).then(() => {
    console.log('Done')
}).finally(() => {
    return snowmix.close()
})
