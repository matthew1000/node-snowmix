#!/usr/bin/env node
'use strict'
/**
 * Creates  a text and display it on the video
 */
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    id = process.argv[2]

if (!id) throw new Error('Please provide a text ID as argument')

snowmix.connect()
.then(() => {
    let t = snowmix.texts.byId(id)
    if (!t) throw new Error(`Text ID ${id} does not exist`)
    return t.hide()
}).then(() => {
    console.log('Done')
}).finally(() => {
    return snowmix.close()
})
