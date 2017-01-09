'use strict'
const _ = require('lodash'),
      Promise = require('bluebird'),
      logger = require('./logger')

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
        if (!this.snowmix.systemInfo.populated)
            throw new Error('Unable to create feeds until connection is complete')
        const defaults = {
            id: parseInt(id),
            name: id === 0 ? 'SYSTEM-FEED' : 'Feed #' + id,
            width: this.snowmix.systemInfo.systemGeometry.width,
            height: this.snowmix.systemInfo.systemGeometry.height
        }

        _.defaults(this, args, defaults)
    }

    /**
     * @return {Array} of Vfeed objects
     */
    getVirtualFeedsUsingThisFeed() {
        return this.snowmix.vfeeds.all().filter(v => { return v.sourceId == this.id })
    }

    /**
     * Finds, and if it can't be found makes, a 'primary' virtual feed for this video feed,
     * i.e. one that is full-screen.
     * @return {Promise}
     */
    getOrMakePrimaryVirtualFeed() {
        let allFeeds = this.getVirtualFeedsUsingThisFeed()
        if (allFeeds.length) return Promise.resolve(allFeeds[0]) // TODO better logic
        return this.snowmix.vfeeds.add({ source: 'feed', sourceId: this.id })
    }

    /**
     * Switch the output to this feed.
     * @return {Promise}
     */
    switch() {
        console.log('moo-1')
        return this.getOrMakePrimaryVirtualFeed()
        .catch(err => {
            logger.error('Unable to switch: cannot make vfeed:', err)
        })
        .then(primaryVirtualFeed => {
            console.log('moo11', primaryVirtualFeed.id)
            if (primaryVirtualFeed) return primaryVirtualFeed.switch()
            throw new Error(`Cannot switch to field ${this.id} as no virtual feed found/created`)
        })
    }

    apply() {
        return this.inSnowmix ? this._updateInSnowmix() : this._createInSnowmix()
    }

    _createInSnowmix() {
        let createCommands = [
            `feed add ${this.id} ${this.name}`,
            `feed geometry ${this.id} ${this.width} ${this.height}`,
            `feed live ${this.id}`,
            `feed idle ${this.id} 100 frames/dead-1024x576.bgra`,
            `feed socket ${this.id} /tmp/feed-${this.id}-control-pipe`
        ]

        return this.snowmix.sendCommand(createCommands, { tidy: true, expectResponse: false })
    }

    _updateInSnowmix() {
        let updateCommands = [
            `feed name ${this.id} ${this.name}`,
            `feed idle ${this.id} 100 frames/dead-1024x576.bgra`,
        ]
        return this.snowmix.sendCommand(updateCommands, { tidy: true, expectResponse: false })
    }

}

module.exports = Feed
