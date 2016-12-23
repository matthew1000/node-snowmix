'use strict'
/**
 * # Feeds
 *
 * Handles video feeds
 * (Not to be confused with Vfeeds, which are _virtual_ video feeds.)
 *
 */
const _ = require('lodash'),
      Promise = require('bluebird'),
      logger = require('./logger'),
      Feed = require('./FeedObject'),
      utils = require('./utils')

class Feeds {

    constructor(snowmix) {
        this.snowmix = snowmix
        this.feeds = []
    }

    /**
     * Returns all feeds
     * @return {array}
     */
    all() {
        return this.feeds
    }

    /**
     * Returns all feed IDs
     * @return {array} of integers
     */
    allIds() {
        return this.feeds.map(f => f.id )
    }

    /**
     * Returns next available ID.
     * e.g. if existing IDs used are [1,2,3,5] return 4, then 6.
     * @return {integer}
     * @private
     */
    getNextAvailableId () {
        return utils.findFirstHoleInSequence(this.allIds())
    }

    /**
     * Get a feed by ID
     *
     * @param {integer} ID
     * @return {Feed} object
     */
    byId(id) {
        return this.feeds.find(f => f.id === id)
    }

    /**
     * Add a new (Video) feed, for when you have a new video source
     * Or, if a video feed of the specified ID is provided, updates it.
     *
     * @param {object} containing 'name' (required) and 'id' (optional)
     * If omitted, id will be next highest value.
     * @return {Feed} object
     *
     * TODO - not yet working because apply() has not been built
     */
    add(args) {
        return this._createOrUpdate(args)
        .then(feed => {
            return feed.apply()
        })
    }

    /**
     * Create or update a video feed.
     * Unlike add(), this does not inform Snowmix.
     *
     * @param {object} containing 'name' (required) and 'id' (optional)
     * If omitted, id will be next highest value.
     * @private
     */
    _createOrUpdate(args) {
        let feed
        if (args.hasOwnProperty('id')) feed = this.byId(args.id)
        if (feed) { // update
            Object.assign(feed, args)
        }
        else { // create
            if (!args.hasOwnProperty('id')) args.id = this.getNextAvailableId()
            feed = new Feed(this.snowmix, args.id, args)
            this.feeds.push(feed)
        }

        return feed
    }

    populate() {
        let feedId
        let feeds = []
        return this.snowmix.sendCommand('feed list verbose', { tidy: true, expectMultiline: true, logAtSillyLevel: true })
        .then(lines => {
            lines.forEach(l => {
                let feedLine = l.match(/^Feed ID (\d+)\s*$/)
                if (feedLine) {
                    feedId = parseInt(feedLine[1])
                    feeds[feedId] = { id: parseInt(feedId) }
                    return
                }
                let dataLine = l.match(/^\s*(Name|State|Socket|Geometry|Is Live):\s*(.+)/)
                if (dataLine) {
                    if (feedId === undefined) throw new Error('Misunderstood response from feed list verbose:'
                        + l + '\nWHOLE RESPONSE:\n'+ lines.join('\n'))
                    if (dataLine[1] === 'Name') feeds[feedId].name = dataLine[2]
                    if (dataLine[1] === 'State') feeds[feedId].state = dataLine[2]
                    if (dataLine[1] === 'Socket') feeds[feedId].socket = dataLine[2]
                    if (dataLine[1] === 'Geometry') [feeds[feedId].x, feeds[feedId].y] = dataLine[2].split(' ')
                    if (dataLine[1] === 'Is Live') feeds[feedId].live = dataLine[2] === 'Yes'
                }
            })

            feeds.forEach(f => {
                if (!this.feeds[f.id]) this._createOrUpdate(f)
            })
        })
    }
}

module.exports = Feeds
