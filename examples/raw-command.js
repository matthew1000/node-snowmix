#!/usr/bin/env node
'use strict'
/**
 * An example of sending a raw Snowmix command
 */
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new()

snowmix.connect()
.then(() => {
    return snowmix.sendCommand('system geometry').then(response => { console.log('I got', response) })
}).finally(() => {
    return snowmix.close()
})
