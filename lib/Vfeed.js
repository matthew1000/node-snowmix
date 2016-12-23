'use strict'
const _ = require('lodash'),
      Promise = require('bluebird'),
      logger = require('./logger')

const defaults = {
    name: '',
}

/**
 * A virtual video feed
 * @example
 *     let vfeed = snowmix.vfeeds.byId(1)
 *     vfeed.show()
 * @property {integer} id
 * @property {string} name
 * @property {string} state
 * @property {string} source - 'feed' or 'image'
 * @property {integer} sourceId - of the feed or image
 * @property {array} coors - [x,y]
 * @property {array} geometry - [x,y]
 * @property scale
 * @property clipCoordinates
 * @property clipGeometry
 * @property rotation
 * @property alpha
 * @property filter
 */
class Vfeed {

    constructor(snowmix, id, args) {
        this.snowmix = snowmix
        this.id = id
        Object.keys(args).forEach(arg => { this[arg] = args[arg] })
        _.defaults(this, defaults)
    }

    /**
     * Returns the feed object that this virtual feed is for
     * @return {Feed}
     */
    getFeed() {
        return this.snowmix.feeds.byId(this.sourceId)
    }

    /**
     * Switch the output to this feed.
     * @return {Promise}
     */
    switch() {
        this.snowmix.vfeeds.all().forEach(vf => { vf.showing = false })
        this.showing = true
        return this.snowmix.command.updateShowCommand()
    }
}

module.exports = Vfeed
