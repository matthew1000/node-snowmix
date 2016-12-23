'use strict'
const _ = require('lodash'),
      Promise = require('bluebird'),
      logger = require('./logger')

const defaults = {
    name: '',
}

/**
 * An single audio feed
 * @example let feedName = snowmix.audiofeeds.byId(1).name
 * @property {integer} id
 * @property {string} name
 * @property {string} state
 * @property {integer} channels
 * @property {boolean} muted
 * @property rate
 * @property delay
 * @property queues
 * @property bufferSize
 * @property bytePerSample
 */
class Audiofeed {

    constructor(snowmix, id, args) {
        this.snowmix = snowmix
        this.id = id
        Object.keys(args).forEach(arg => { this[arg] = args[arg] })
        _.defaults(this, defaults)
    }
}

module.exports = Audiofeed
