#!/usr/bin/env node
'use strict'
/**
 * Creates a range of texts, of different colours and sizes.
 */
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    outputFile = __dirname + '/../examples/assets/text-lots-of-examples.png'

snowmix.connect()
.then(() => {
    return snowmix.texts.add({ string : 'I am red, size 50', id: 1, green: 0, blue: 0, red: 1, fontSize: 50 })
    .then(text => { return text.show() })
}).then(() => {
    return snowmix.texts.add({ string : 'I am turquoise, size 32, x=50, y=50', id: 2, green: 1, blue: 1, red: 0, fontSize: 32, y: 50, x:50 })
    .then(text => { return text.show() })
}).then(() => {
    return snowmix.texts.add({ string : 'I am Geneva font', id: 3, fontSize: 40, fontName: 'Geneva', y: 100 })
    .then(text => { return text.show() })
}).then(() => {
    return snowmix.texts.add({ string : 'I have a blue background and 50% Alpha value', id: 4, fontSize: 16, fontName: 'Sans', y: 150, backgroundBlue: 1, backgroundAlpha: 0.5 })
    .then(text => { return text.show() })
}).then(() => {
    return snowmix.texts.add({ string : 'I have loads of top & left background padding', id: 5, green: 0, blue: 0, red: 0, fontSize: 24, fontName: 'Sans', y: 250, x: 250, backgroundRed: 1, backgroundBlue: 1, backgroundGreen: 1, backgroundAlpha: 1, backgroundLeftPad: 50 , backgroundTopPad: 50 })
    .then(text => { return text.show() })
}).then(() => {
    return snowmix.general.writeSnapshotImage(outputFile)
}).then(() => {
    console.log('Done, written to', outputFile)
}).finally(() => {
    return snowmix.close()
})
