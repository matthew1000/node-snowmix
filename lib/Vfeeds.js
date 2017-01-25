'use strict'
const _ = require('lodash'),
    Promise = require('bluebird'),
    logger = require('./logger'),
    Vfeed = require('./Vfeed'),
    SnowmixItemCollection = require('./SnowmixItemCollection')

/**
 * snowmix.vfeeds - controls all vfeeds (virtual video feeds)
 * (Not to be confused with Feeds, which are _non-virtual_ video feeds.)
 *
 * @extends SnowmixItemCollection
 * @example let numVfeedsShowing = this.items.getShowingIds().length
 */
class Vfeeds extends SnowmixItemCollection {

    constructor(snowmix) {
        super(snowmix)
        this.itemName = Vfeed
    }

    /**
     * Returns the IDs of all Vfeeds that are showing (visible).
     * @return {array}
     */
    getShowingIds() {
        return this.items.filter(t => t.showing).map(t => t.id)
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
        return super.add(args)
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

                if (l.match(/^\s*virtual feed info:\s*$/)) return

                let countMatch = l.match(/^\s*vfeed count\s*:\s*(\d+)\s*of\s*(\d+)\s*$/)
                if (countMatch) {
                    this.maxVfeeds = countMatch[2]
                    return
                }

                let verboseMatch = l.match(/^\s*vfeed verbose level\s*:\s*(\d+)\s*$/)
                if (verboseMatch) return

                if (l.match(/^\s*vfeed id : state source source_id coors geometry scale clip_cors clip_geometry rotation alpha filter\s*$/)) return

                let mainMatch = l.match(/^[-\s]*vfeed\s*(\d+)\s*:\s*(.+)$/)
                if (mainMatch) {
                    let id = parseInt(mainMatch[1])
                    let details = mainMatch[2].split(' ')

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
