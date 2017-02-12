#!/usr/bin/env node
/**
 * Lists all audioFeeds as a table
 */
'use strict'
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    AsciiTable = require('ascii-table'),
    audioFeedId = parseInt(process.argv[2])

snowmix.connect()
.then(() => {
    let images = snowmix.images.all()
    if (images.length) {
        console.log('There are %d images:', images.length)
        console.log(
            new AsciiTable()
            .setHeading('ID', 'Filename', 'Width', 'Height', 'Num places')
            .addRowMatrix(images.map(i => { return [i.id, i.filename, i.width, i.height, i.places().length] }))
            .toString()
        )
    }
    else {
        console.log('There are no images')
    }

    let imagePlaces = snowmix.imagePlaces.all()
    if (imagePlaces.length) {
        console.log('There are %d image places:', images.length)
        console.log(
            new AsciiTable()
            .setHeading('ID', 'Image ID', 'X', 'Y', 'Width', 'Height', 'Rotation', 'Alpha', 'Anchor X', 'Anchor Y', 'Horizontal align', 'Vertical align')
            .addRowMatrix(imagePlaces.map(f => { return [f.id, f.imageId, f.x, f.y, f.width, f.height, f.rotation, f.alpha, f.anchorX, f.anchorY, f.horizontalAlign, f.verticalAlign] }))
            .toString()
        )
    }
    else {
        console.log('There are no image places')
    }
})
.finally(() => {
    return snowmix.close()
})
