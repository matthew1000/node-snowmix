#!/usr/bin/env node
'use strict'
/**
 * An example of sending a raw Snowmix command
 */
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new()

snowmix.connect()
.then(() => {
    Object.keys(snowmix.systemInfo).forEach(k => {
        if (k === 'snowmix') return
        console.log('%s : %j', k, snowmix.systemInfo[k])
    })

}).finally(() => {
    return snowmix.close()
})
