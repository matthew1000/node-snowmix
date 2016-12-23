#!/usr/bin/env node
'use strict'
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new()

snowmix.connect()
.then(() => {
    return snowmix.commands.resetShowCommand()
})
.then(() => {
    console.log('Done')
})
.finally(() => {
    return snowmix.close()
})
