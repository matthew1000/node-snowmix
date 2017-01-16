'use strict'
const _ = require('lodash'),
      Promise = require('bluebird'),
      logger = require('./logger'),
      utils = require('./utils')

/**
 * Abstract superclass for a Snowmix item.
 * (Feed, Vfeed, Text, AudioMixer, and the rest.)
 */
class SnowmixItem {
    constructor(snowmix) {
        this.snowmix = snowmix
    }

    /**
     * Assign values to this item
     * @param {Object} new values
     * @param {Boolean} track changes? Defaults to false, if true,sets changed=true if change found.
     */
    assign(args, trackChange = false) {
        _.forEach(args, (value, key) => {
            if (value !== this[key]) {
                if (trackChange) this.changed = true
                this[key] = value
            }
        })
    }
}

module.exports = SnowmixItem
