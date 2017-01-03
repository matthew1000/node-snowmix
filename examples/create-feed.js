#!/usr/bin/env node
'use strict'
/**
 * Creates a feed
 */
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    AsciiTable = require('ascii-table'),
    id = process.argv[2],
    name = process.argv[3]

if (!id || !id.match(/^[0-9]+$/ || !name)) throw new Error('Please provide ID as argument 1 and name as argument 2')

snowmix.connect()
.then(() => {
    return snowmix.feeds.add({ name : name, id: id })
}).then(() => {
    console.log('Done')
}).finally(() => {
    return snowmix.close()
})
