#!/usr/bin/env node
'use strict'
/**
 * Creates a command
 */
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    name = process.argv[2],
    lines = process.argv.slice(3)

if (!name || lines.length === 0) {
    console.warn('Please provide a command name then one or more lines')
    process.exit(1)
}

snowmix.connect()
.then(() => {
    return snowmix.commands.create(name, lines)
}).then(c => {
    console.log(`Created`, c)
}).finally(() => {
    return snowmix.close()
})
