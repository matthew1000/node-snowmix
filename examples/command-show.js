#!/usr/bin/env node
'use strict'
/**
 * Lists the contents of one command
 */
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new()

snowmix.connect()
.then(() => {
    return snowmix.commands.list(name)
}).then(lines => {
    console.log(lines)
}).finally(() => {
    return snowmix.close()
})
