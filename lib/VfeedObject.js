'use strict'
/**
 * # Snowmix/VfeedObject
 *
 * A virtual video feed
 *
 *     var vfeed = snowmix.vfeeds.create({name: 'Camera 2'})
 *     vfeed.show()
 *
 * Fields:
 *      id
 *      state
 *      source - string 'feed'
 *      sourceId - id of the source feed
 *      coors - array [x,y]
 *      geometry
 *      scale
 *      clipCoordinates
 *      clipGeometry
 *      roration
 *      alpha
 *      filter
 *
 */
const _ = require('lodash'),
      Promise = require('bluebird'),
      logger = require('./logger')

const defaults = {
    name: '',
}

class VfeedObject {

    constructor(snowmix, id, args) {
        this.snowmix = snowmix
        this.id = id
        Object.keys(args).forEach(arg => { this[arg] = args[arg] })
        _.defaults(this, defaults)
    }

    /**
     * Returns the feed object that this virtual feed is for
     */
    getFeed() {
        return this.snowmix.feeds.byId(this.sourceId)
    }

    /**
     * Switch the output to this feed.
     */
    switch() {
        this.snowmix.vfeeds.all().forEach(vf => { vf.showing = false })
        this.showing = true
        return this.snowmix.command.updateShowCommand()
    }
}

module.exports = VfeedObject
