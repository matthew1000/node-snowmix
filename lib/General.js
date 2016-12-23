'use strict'
const _ = require('lodash'),
    camelCase = require('camelcase'),
    Promise = require('bluebird'),
    logger = require('./logger')

/**
 * Handles the General commands: https://sourceforge.net/p/snowmix/wiki/Reference%20General/
 * @example snowmix.general.framerate().then(fr => { console.log(fr) })
 */
class General {
    constructor(snowmix) {
        this.snowmix = snowmix
    }

    /**
     * Get the framerate, as an integer.
     * @example snowmix.gerneral.framerate().then(frameRate => { ... })
     */
    framerate() {
        return this.systemInfoSingle('framerate')
    }

    /**
     * Get the system geometry, as e.g. { width: 123, height: 456 }
     * @example snowmix.gerneral.systemGeometry().spread((width, height) => { ... })
     */
    systemGeometry() {
        return this.systemInfoSingle('systemGeometry')
    }

    /**
     * Get the contents of a single bit of system information from the 'system info' comand,
     * including:
     *
     *  iniFile
     *  controlPortNumber
     *  outputFramesInuse
     *  snowmixVersion
     *
     * @example snowmix.gerneral.systemInfoSingle('frameRate').then(frameRate => { ... })
     */
    systemInfoSingle(field, args) {
        return this.systemInfo(args)
        .then(info => info[field])
    }

    /**
     * Get the contents of the 'system info' command, parsed into an associative array.
     * Caches the response unless {cached: false} is provided
     * @example snowmix.gerneral.systemInfo().then(info => { ... })
     */
    systemInfo(args) {
        if (this.systemInfoCaptured && (!args || (args.hasOwnProperty('cached') && !args.cached)))
            return Promise.resolve(this.systemInfoCaptured)

        return this.snowmix.sendCommand('system info', { tidy: true, expectMultiline: true, logAtSillyLevel: true })
        .then(info => {
            info = parseSystemInfoResponse(info)
            this.systemInfoCaptured = info
            return info
        })
    }

    /**
     * Turns verbose on
     * This library breaks if not set to 1.
     *
     * @private
     */
    ensureVerboseOn() {
        return this.systemInfoSingle('ctrVerbose')
        .then(isCurrentlyVerbose => {
            if (isCurrentlyVerbose) return
            return this.snowmix.sendCommand('verbose', { tidy: true })
            .then(response => {
                let expected = 'verbose is on'
                if (response.length !== 1 || response[0] !== expected)
                    throw new Error(`Expected '${expected}', got '${response}'`)
            })
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
            info[camelCase(matches[1])] = parseValue(matches[2])
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

module.exports = General
