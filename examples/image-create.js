#!/usr/bin/env node
'use strict'
/**
 * Creates or updates an and shows it on the video
 */
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    AsciiTable = require('ascii-table'),
    id = process.argv[2],
    filename = process.argv[3]

if (!filename) throw new Error('Please provide a id then the image filename (string) as argument')

snowmix.connect()
.then(() => {
    return snowmix.images.add({ id: id, filename: filename, x: 100 })
    .then(image => {
        return image.addPlace({x: 500, y: 200})
        .then(imagePlace => {
            return imagePlace.show()
        })
    })
}).then(() => {
    console.log('Done')
}).finally(() => {
    return snowmix.close()
})
