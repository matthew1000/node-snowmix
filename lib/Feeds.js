'use strict'
const _ = require('lodash'),
      Promise = require('bluebird'),
      logger = require('./logger'),
      Feed = require('./Feed'),
      utils = require('./utils'),
      SnowmixItemCollection = require('./SnowmixItemCollection')

/**
 * Handles video feeds
 * (Not to be confused with Vfeeds, which are _virtual_ video feeds.)
 *
 * @extends SnowmixItemCollection
 */
class Feeds extends SnowmixItemCollection {

    constructor(snowmix) {
        super(snowmix)
        this.itemName = Feed
    }

    /**
     * Get a feed by ID
     *
     * @param {integer} ID
     * @return {Feed} object
     */
    byId(id) {
        id = parseInt(id)
        return this.items.find(f => f.id === id)
    }

    /**
     * Add a new (video) feed, for when you have a new video source
     * Or, if a video feed of the specified ID is provided, updates it.
     *
     * @param {object} containing 'name' (required) and 'id' (optional)
     * If omitted, id will be next highest value.
     * @return {Feed} object
     */
    add(args) {
        return super.add(args)
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
                let dataLine = l.match(/^\s*(Name|State|Socket|Geometry|Is Live|Frames|Dropped|Missed):\s*(.+)/)
                if (dataLine) {
                    if (feedId === undefined) throw new Error('Misunderstood response from feed list verbose:'
                        + l + '\nWHOLE RESPONSE:\n'+ lines.join('\n'))
                    if (dataLine[1] === 'Name') feeds[feedId].name = dataLine[2]
                    if (dataLine[1] === 'State') feeds[feedId].state = dataLine[2]
                    if (dataLine[1] === 'Socket') feeds[feedId].socket = dataLine[2]
                    if (dataLine[1] === 'Frames') feeds[feedId].frames = dataLine[2]
                    if (dataLine[1] === 'Dropped') feeds[feedId].dropped = dataLine[2]
                    if (dataLine[1] === 'Missed') feeds[feedId].missed = dataLine[2]
                    if (dataLine[1] === 'Geometry') feeds[feedId].geometry = dataLine[2].split(' ')
                    if (dataLine[1] === 'Is Live') feeds[feedId].live = dataLine[2] === 'Yes'
                }
            })

            feeds.forEach(f => {
                f.inSnowmix = true
                if (!this.items[f.id]) this._createOrUpdate(f)
            })
        })
    }
}

module.exports = Feeds
