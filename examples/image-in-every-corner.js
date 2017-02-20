#!/usr/bin/env node
'use strict'
/**
 * An example that puts a rainbow in every corner.
 */
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    inputFile = __dirname + '/../examples/assets/rainbow-200.png',
    outputFile = __dirname + '/../examples/assets/rainbow-in-every-corner.png'

snowmix.connect()
.then(() => {
    return snowmix.images.add({id: 1, filename: inputFile })
}).then(image => {
    return Promise.all([
        image.addPlace({id: 1, x: 0, y: 0}),
        image.addPlace({id: 2, x: snowmix.systemInfo.systemGeometry.width-200, y: 0}),
        image.addPlace({id: 3, x: 0, y: snowmix.systemInfo.systemGeometry.height-200}),
        image.addPlace({id: 4, x: snowmix.systemInfo.systemGeometry.width-200, y: snowmix.systemInfo.systemGeometry.height-200})
    ])
}).then(() => {
    return Promise.all([
        snowmix.imagePlaces.byId(1).show(),
        snowmix.imagePlaces.byId(2).show(),
        snowmix.imagePlaces.byId(3).show(),
        snowmix.imagePlaces.byId(4).show(),
    ])
}).then(() => {
    return snowmix.imagePlaces.byId(2).show()
}).then(() => {
    return snowmix.general.writeSnapshotImage(outputFile)
}).then(() => {
    console.log('Done - written output to', outputFile)
}).finally(() => {
    return snowmix.close()
})
