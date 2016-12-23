'use strict'
/**
 * # Snowmix/FeedObject
 *
 * A video feed (not to be confused with a virutal feed).
 *
 * @example
 *     let feed = snowmix.feeds.byId(2)
 *     feed.switch().then(...)
 *
 */
const _ = require('lodash'),
      Promise = require('bluebird'),
      logger = require('./logger')

const defaults = {
    name: '',
}

class FeedObject {
    constructor(snowmix, id, args) {
        this.snowmix = snowmix
        this.id = id
        Object.assign(this, args)
        // Object.keys(args).forEach(arg => { this[arg] = args[arg] })
        _.defaults(this, defaults)
    }

    /**
     * Returns an array
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

module.exports = FeedObject
