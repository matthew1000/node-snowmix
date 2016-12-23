'use strict'
/**
 * # Snowmix/Feeds
 *
 * Handles virtual video feeds
 * (Not to be confused with Feeds, which are _non-virtual_ video feeds.)
 *
 */
const _ = require('lodash'),
      Promise = require('bluebird'),
      logger = require('./logger'),
      Vfeed = require('./VfeedObject'),
      utils = require('./utils')

class Vfeeds {

    constructor(snowmix) {
        this.snowmix = snowmix
        this.vfeeds = []
    }

    /**
     * Returns all vfeeds
     *
     * @return {array}}
     */
    all() {
        return this.vfeeds
    }

    /**
     * Returns all vfeed IDs
     *
     * @return {array} of integers
     */
    allIds() {
        return this.vfeeds.map(f => f.id)
    }

    /**
     * Get a vfeed by ID
     *
     * @param {integer} ID
     * @return {Vfeed} instance
     */
    byId(id) {
        return this.vfeeds.find(f => f.id === id)
    }

    /**
     * Returns the IDs of all Vfeeds that are showing (visible).
     * @return {array}
     */
    getShowingIds() {
        return this.vfeeds.filter(t => t.showing).map(t => t.id)
    }

    /**
     * Returns next available ID.
     * e.g. if existing IDs used are [1,2,3,5] return 4, then 6.
     *
     * @return {integer}
     */
    getNextAvailableId() {
        return utils.findFirstHoleInSequence(this.allIds())
    }

    /**
     * Add a new (Video) virtual feed.
     * Of, if a video feed of the specified ID is provided, updates it.
     *
     * @param {object} containing 'name' (required) and 'id' (optional)
     * If omitted, id will be next highest value.
     */
    addOrUpdate(args) {
        let vfeed
        if (args.hasOwnProperty('id')) vfeed = this.byId(args.id)
        if (vfeed) { // update
            Object.assign(vfeed, args)
        }
        else { // create
            if (!args.hasOwnProperty('id')) args.id = this.getNextAvailableId()
            vfeed = new Vfeed(this.snowmix, args.id, args)
            this.vfeeds.push(vfeed)
        }

        return vfeed
    }

    /**
     * Populates the information known about feeds from Snowmix
     * Run automatically when Snowmix is first connected.
     * @private
     */
    populate() {
        let feedId
        let feeds = []
        return this.snowmix.sendCommand('vfeed info', { tidy: true, expectMultiline: true, logAtSillyLevel: true })
        .then(lines => {
            lines.forEach(l => {
                let match

                if (l.match(/^\s*virtual feed info:\s*$/)) return

                if (match = l.match(/^\s*vfeed count\s*:\s*(\d+)\s*of\s*(\d+)\s*$/)) {
                    this.maxVfeeds = match[2]
                    return
                }

                if (match = l.match(/^\s*vfeed verbose level\s*:\s*(\d+)\s*$/)) return

                if (l.match(/^\s*vfeed id : state source source_id coors geometry scale clip_cors clip_geometry rotation alpha filter\s*$/)) return

                if (match = l.match(/^[-\s]*vfeed\s*(\d+)\s*:\s*(.+)$/)) {
                    let id = parseInt(match[1])
                    let details = match[2].split(' ')
                    this.addOrUpdate({
                        id: id,
                        state: details[0],
                        source: details[1],
                        sourceId: details[2],
                        coors: details[3].split(',').map(_.toNumber),
                        geometry: details[4],
                        scale: details[5].split(',').map(_.toNumber),
                        clipCoordinates: details[6].split(',').map(_.toNumber),
                        clipGeometry: details[7],
                        roration: _.toNumber(details[8]),
                        alpha: _.toNumber(details[9]),
                        filter: details[10]
                    })
                    return
                }

                logger.warn('Misunderstood line in vfeed info [%s]', l)
            })
        })
    }
}

module.exports = Vfeeds
