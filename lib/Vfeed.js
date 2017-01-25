'use strict'
const _ = require('lodash'),
    Promise = require('bluebird'),
    logger = require('./logger'),
    SnowmixItem = require('./SnowmixItem')

/**
 * A virtual video feed
 *
 * @extends SnowmixItem
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
class Vfeed extends SnowmixItem {

    constructor(snowmix, id, args) {
        super(snowmix)
        this.id = id
        if (!this.snowmix.systemInfo.populated)
            throw new Error('Unable to create feeds until connection is complete')
        const defaults = {
            width: this.snowmix.systemInfo.systemGeometry.width,
            height: this.snowmix.systemInfo.systemGeometry.height
        }
        Object.assign(this, defaults, args);
        ['id', 'sourceId'].forEach(k => { this[k] = parseInt(this[k]) })
        if (!this.name) this.name = 'Vfeed #' + this.id
    }

    /**
     * Returns the feed object that this virtual feed is for
     * @return {Feed}
     */
    getFeed() {
        return this.snowmix.feeds.byId(this.sourceId)
    }

    /**
     * Remove this vfeed from Snowmix
     * @return {Promise}
     */
    remove() {
        this.snowmix.vfeeds.removeFromInternalList(this)
        return this.snowmix.sendCommand(`vfeed add ${this.id}`, { tidy: true, expectResponse: false })
    }

    apply() {
        // Name is not optional
        // Note vfeed source will claim invalid number of parameters if feed id is not valid
        let createCommands = [
            `vfeed add ${this.id} ${this.name || 'vfeed-with-no-name'}`,
            `vfeed source feed ${this.id} ${this.sourceId}`,
            `vfeed place rect ${this.id} 0 0 ${this.width} ${this.height} 0 0 0.0 1.0 1.0 1.0`
        ]

        return this.snowmix.sendCommand(createCommands, { tidy: true, expectResponse: false })
    }

    /**
     * Switch the output to this feed.
     * @return {Promise}
     */
    switch() {
        this.snowmix.vfeeds.all().forEach(vf => { vf.showing = false })
        this.showing = true
        return this.snowmix.commands.updateShowCommand('vfeed')
    }
}

module.exports = Vfeed
