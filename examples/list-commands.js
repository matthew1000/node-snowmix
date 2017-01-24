#!/usr/bin/env node
'use strict'
/**
 * Lists all commands
 */
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new()

snowmix.connect()
.then(() => {
    return snowmix.commands.listAll()
}).then(commands => {
    console.log(commands)
}).finally(() => {
    return snowmix.close()
})
