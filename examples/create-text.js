#!/usr/bin/env node
/**
 * Creates  a text
 */
'use strict'
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    AsciiTable = require('ascii-table'),
    textString = process.argv[2]

if (!textString) throw new Error('Please provide a string as argument')

snowmix.connect()
.then(() => {
    return snowmix.texts.add({ string : textString })
}).then(() => {
    console.log('Done')
}).finally(() => {
    return snowmix.close()
})
