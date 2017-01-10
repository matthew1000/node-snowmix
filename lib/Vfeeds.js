'use strict'
const _ = require('lodash'),
      Promise = require('bluebird'),
      logger = require('./logger'),
      Vfeed = require('./Vfeed'),
      utils = require('./utils')

/**
 * snowmix.vfeeds - controls all vfeeds (virtual video feeds)
 * (Not to be confused with Feeds, which are _non-virtual_ video feeds.)
 * @example let numVfeedsShowing = this.vfeeds.getShowingIds().length
 */
class Vfeeds {

    constructor(snowmix) {
        this.snowmix = snowmix
        this.vfeeds = []
    }

    /**
     * Returns all vfeeds
     *
     * @return {array}
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
     * @return {Vfeed}
     */
    byId(id) {
        id = parseInt(id)
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
     * Remove all vfeeds
     * @return {Promise}
     */
    removeAll() {
        return Promise.map(this.allIds(), id => { return this.byId(id).remove() })
    }

    removeVfeedFromInternalListOfVfeeds(vfeed) {
        _.remove(this.vfeeds, v => v === vfeed)
    }

    /**
     * Add a new vfeed
     * Or, if a vfeed of the specified ID is provided, updates it.
     *
     * @param {object} containing source & sourceId (essential), name & id (optional)
     * If omitted, id will be next highest value.
     * @return {Vfeed} object
     */
    add(args) {
        let vfeed = this._createOrUpdate(args)
        return vfeed.apply().return(vfeed)
    }

    _createOrUpdate(args = {}) {
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
     * Analyses the 'Show' command to look for 'vfeed overlay 1 2 3' and discover
     * which vfeed IDs are showing. This then populates the 'showing' property.
     * @private
     */
    discoverShowingIds() {
        return this.snowmix.commands.getLinesThatMatch(/^vfeed overlay\s*(.+)$/, 'Show')
        .then(vfeedOverlayCommands => {
            let ids = []
            Object.keys(vfeedOverlayCommands).forEach(lineNumber => {
                ids = ids.concat(vfeedOverlayCommands[lineNumber][1].split(' ').map(_.toNumber))
            })

            return ids
        })
    }

    /**
     * Runs when Snowmix is connected to discover all vfeeds.
     * @private
     */
    populate() {
        return this._parseVfeedAddCommand()
        .then(idsAndNames => {
            return this.discoverShowingIds()
            .then(showingIds => {
                return this._parseVfeedInfoCommand(idsAndNames, showingIds)
            })
        })
    }

    _parseVfeedAddCommand() {
        return this.snowmix.sendCommand('vfeed add', { tidy: true, expectMultiline: true, logAtSillyLevel: true })
        .then(lines => {
            let idsAndNames = {}
            lines.forEach(l => {
                let match = l.match(/^\s*vfeed\s*(\d+)[:\s]*<(.+)>\s*$/)
                if (match) idsAndNames[parseInt(match[1])] = match[2]
            })

            return idsAndNames
        })
    }

    _parseVfeedInfoCommand(idsAndNames, showingIds) {
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

                    if (!idsAndNames.hasOwnProperty(id)) {
                        logger.debug('Vfeed %d is known by [vfeed add] but not [vfeed info], omitting', id)
                        return
                    }

                    this._createOrUpdate({
                        id: id,
                        name: idsAndNames[id],
                        showing: showingIds.indexOf(id) !== -1,
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
                        filter: details[10],
                        inSnowmix: true
                    })
                    return
                }

                logger.warn('Misunderstood line in vfeed info [%s]', l)
            })
        })
    }
}

module.exports = Vfeeds
