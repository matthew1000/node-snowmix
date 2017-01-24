'use strict'
const _ = require('lodash'),
    camelCase = require('camelcase'),
    Promise = require('bluebird'),
    logger = require('./logger')

/**
 * Stores the contents of the 'system info' command.
 * includes `systemGeometry`, verbose, hostAllow, systemName
 * For the full list, run `examples/system-info.js`
 * @example console.log(`The framerate is ${snowmix.systemInfo.framerate}`)
 */
class SystemInfo {
    constructor(snowmix) {
        this.snowmix = snowmix
    }

    /**
     * Populates this object by running 'system info'
     * Done automatically on connection, so should not need running again.
     * @example snowmix.systemInfo.populate().then( => { ... })
     */
    populate(args) {
        this.populated = true
        return this.snowmix.sendCommand('system info', { tidy: true, expectMultiline: true, logAtSillyLevel: true })
        .then(info => {
            info = parseSystemInfoResponse(info)
            Object.assign(this, info)
        })
    }

    clearCache() {
        delete this.systemInfoCaptured
    }
}

// Turns e.g. ['Pixel format         : BGRA'] into {pixelFormat: 'BGRA'}
function parseSystemInfoResponse(arrayOfStrings) {
    let info = {}

    function parseValue(v) {
        if (v === 'no') return false
        if (v === 'yes') return true
        if (v.match(/^-?\d+(\.\d*)?$/)) return parseInt(v)
        return v
    }

    arrayOfStrings.forEach(str => {
        if (str === 'System info') return
        let matches = str.match(/^(.+?)\s+:\s+(.+)$/)
        if (matches) {
            info[tidyKey(matches[1])] = parseValue(matches[2])
        }
    })

    if (info.systemGeometry) info.systemGeometry = parseGeometry(info.systemGeometry)

    return info
}

function parseGeometry(g) {
    let match = g.match(/^(\d+)x(\d+)(\s*pixels)?$/)
    if (match) return { width: parseInt(match[1]), height: parseInt(match[2]) }
    return
}

function tidyKey(key) {
    key = camelCase(key)
    let tidierNames = {
        ctrVerbose : 'verbose',
        ctrBroadcast : 'broadcast'
    }
    return tidierNames[key] || key
}

module.exports = SystemInfo
