'use strict'
const _ = require('lodash'),
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
     * Turns verbose on
     * This library breaks if not set to 1.
     *
     * @private
     */
    ensureVerboseOn() {
        if (this.snowmix.systemInfo.verbose) return Promise.resolve()
        return this.snowmix.sendCommand('verbose', { tidy: true })
        .then(response => {
            let expected = 'verbose is on'
            if (response.length !== 1 || response[0] !== expected)
                throw new Error(`Expected '${expected}', got '${response}'`)

            this.snowmix.systemInfo.verbose = true
        })
    }

    /**
     * Take a snapshot of the image and write to file.
     * Note this won't work unless there is something outputting the video,
     * and also that there is something being ouptutted. Otherwise it willf fail silently.
     * @param {String} filename
     */
    writeSnapshotImage(filename) {
        return this.snowmix.sendCommand('png write ' + filename, { tidy: true, expectResponse: false })
    }
}

module.exports = General
