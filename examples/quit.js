#!/usr/bin/env node
'use strict'
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new()

snowmix.connect()
.then(() => {
    return snowmix.general.quit()
})
.then(() => {
    return snowmix.close()
})
.then(() => {
    console.log('OK, Snowmix has quit')
})
