'use strict'
const _ = require('lodash'),
    Promise = require('bluebird'),
    logger = require('./logger'),
    SnowmixText = require('./Text'),
    SnowmixItemCollection = require('./SnowmixItemCollection')

/**
 * Handles all texts
 *
 * @extends SnowmixItemCollection
 * @example let numTexts = snowmix.texts.all().length
 * @example let contentsOfText1 = snowmix.texts.byId(1).string
 */
class Texts extends SnowmixItemCollection {

    constructor (snowmix) {
        super(snowmix)
        this.itemName = SnowmixText
    }

    /**
     * Returns the IDs of all Texts that are showing (visible).
     * @return {array}
     */
    getShowingIds() {
        return this.items.filter(t => t.showing).map(t => t.id)
    }

    /**
     * Creates a new text, or update an existing one if the ID exists.
     *
     * @param {object} containing 'string' (required) and 'id' (optional)
     * If omitted, id will be next highest value.
     * @return {Promise} returning the created Text object
     */
    create(args) {
        return super.create(args)
    }

    deleteAll() {
        throw new Error('It is not possible to remove texts in Snowmix')
    }

    /**
     * Run automatically when Snowmix is connected to discover all texts.
     * @private
     */
    populate() {
        return this._parseTextStringCommand()
        .then((idsAndStrings) => {
            return this._parseTextInfoCommand(idsAndStrings)
        })
    }

    /**
     * Parse 'text string' and return its results, parsed
     * @private
     */
    _parseTextStringCommand() {
        return this.snowmix.sendCommand('text string', { tidy: true, expectMultiline: true, logAtSillyLevel: true })
        .then(lines => {
            let idsAndStrings = {}
            lines.forEach(l => {
                let match = l.match(/^\s*text string\s*(\d+)\s*<(.+)>\s*$/)
                if (match) idsAndStrings[parseInt(match[1])] = match[2]
            })

            return idsAndStrings
        })
    }

    /**
     * Parse 'text info' and put results into this.items
     * @private
     */
    _parseTextInfoCommand(idsAndStrings) {
        return this.snowmix.sendCommand('text info', { tidy: true, expectMultiline: true, logAtSillyLevel: true })
        .then(lines => {
            lines.forEach(l => {
                if (l.match(/^\s*text place info\s*$/)) return

                let placedTextsMatch = l.match(/^\s*placed texts\s*:\s*(\d+)\s*$/)
                if (placedTextsMatch) return

                let maxPlacedTextsMatch = l.match(/^\s*max placed texts\s*:\s*(\d+)\s*$/)
                if (maxPlacedTextsMatch) {
                    this.maxTexts = maxPlacedTextsMatch[1]
                    return
                }

                let verboseMatch = l.match(/^\s*verbose level\s*:\s*(\d+)\s*$/)
                if (verboseMatch) {
                    this.verboseLevel = verboseMatch[1]
                    return
                }

                if (l.match(/^\s*text place id : str_id font_id pos offset wxh align anchor scale rot col clip pad colbg clipbg\s*$/)) return

                let mainMatch = l.match(/^\s*text place\s*(\d+)\s*:\s*(.+)$/)
                if (mainMatch) {
                    let id = parseInt(mainMatch[1])
                    let details = mainMatch[2].split(' ')
                    if (!idsAndStrings[id]) {
                        logger.debug('Text id %d is known by [text place] but not [text string], omitting', id)
                        return
                    }
                    this._createOrUpdate({
                        id: id,
                        showing: false,
                        string: idsAndStrings[id],
                        fontId: _.toNumber(details[0]),
                        pos: _.toNumber(details[1]),
                        offset: details[2].split(',').map(_.toNumber),
                        wxh: details[3].split(',').map(_.toNumber),
                        align: details[4],
                        anchor: details[5],
                        scale: details[6].split(',').map(_.toNumber),
                        rot: details[7].split(',').map(_.toNumber),
                        col: details[8].split(',').map(_.toNumber),
                        clip: details[9].split(',').map(_.toNumber),
                        pad: details[10].split(',').map(_.toNumber),
                        colbg: details[11].split(',').map(_.toNumber),
                        clipbg: details[12].split(',').map(_.toNumber),
                    })
                    return
                }

                logger.warn('Misunderstood line in [text info]:', l)
            })
        })
    }
}

module.exports = Texts
