#!/usr/bin/env node
'use strict'
/**
 * Deletes an image
 */
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    id = process.argv[2]
if (!id) throw new Error('Please provide image id as argument')

snowmix.connect()
.then(() => {
    let image = snowmix.images.byId(id)
    if (!image) throw new Error('Cannot find image with id ' + id)
    return image.delete()
}).then(() => {
    console.log(`Removed image ${id}`)
}).finally(() => {
    return snowmix.close()
})
