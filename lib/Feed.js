'use strict'
const _ = require('lodash'),
      Promise = require('bluebird'),
      logger = require('./logger')

const defaults = {
    name: '',
}

/**
 * A single video feed (not to be confused with a vfeed - virtual video feed).
 *
 * @example
 *     let feed = snowmix.feeds.byId(2)
 *     feed.switch().then(...)
 * @property {integer} id
 * @property {string} name
 * @property {string} state - e.g. 'STALLED' or 'PENDING'
 * @property {array} geometry - [x,y]
 * @property {boolean} live
 * @property {integer} offset
 * @property {string} socket
 * @property {integer} frames
 * @property {integer} dropped
 * @property {integer} missed
 */
class Feed {
    constructor(snowmix, id, args) {
        this.snowmix = snowmix
        this.id = id
        Object.assign(this, args)
        _.defaults(this, defaults)
    }

    /**
     * @return {Array} of Vfeed objects
     */
    getVirtualFeedsUsingThisFeed() {
        this.snowmix.feeds.filter(f => { return f.sourceFeed = this.id })
    }

    /**
     * Finds, and if it can't be found makes, a 'primary' virtual feed for this video feed,
     * i.e. one that is full-screen.
     */
    getOrMakePrimaryVirtualFeed() {
        let allFeeds = this.getVirtualFeedsUsingThisFeed()
        if (allFeeds.length) return allFeeds[0] // TODO better logic
        throw new Error('TODO: ability to make virtual feed')
    }

    /**
     * Switch the output to this feed.
     * @return {Promise}
     */
    switch() {
        let primaryVirtualFeed = this.getOrMakePrimaryVirtualFeed()
        if (primaryVirtualFeed) return primaryVirtualFeed.switch()
        throw new Error(`Cannot switch to field ${this.id} as no virtual feed found/created`)
    }
}

module.exports = Feed
