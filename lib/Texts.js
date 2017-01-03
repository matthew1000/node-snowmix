'use strict'
const _ = require('lodash'),
      Promise = require('bluebird'),
      logger = require('./logger'),
      SnowmixText = require('./Text'),
      utils = require('./utils')


/**
 * Handles all texts
 * @example let numTexts = snowmix.texts.all().length
 * @example let contentsOfText1 = snowmix.texts.byId(1).string
 */
class Texts {

    constructor (snowmix) {
        this.snowmix = snowmix
        this.texts = []
    }

    /**
     * Returns all texts
     * @return {array}
     */
    all() {
        return this.texts
    }

    /**
     * Returns all text IDs
     * @return {array} of integers
     */
    allIds() {
        return this.texts.map(f => f.id)
    }

    /**
     * Get a text by ID
     *
     * @param {integer} ID
     * @return {Text} object
     */
    byId(id) {
        id = parseInt(id)
        return this.texts.find(f => f.id === id)
    }

    /**
     * Get a text object by ID
     *
     * @param {integer} ID
     * @return {Text} object
     */
    getById(id) {
        return this.texts[id]
    }

    /**
     * Returns the IDs of all Texts that are showing (visible).
     * @return {array}
     */
    getShowingIds() {
        return this.texts.filter(t => t.showing).map(t => t.id)
    }

    /**
     * Returns next available ID.
     * e.g. if existing IDs used are [1,2,3,5] return 4, then 6.
     * @return {integer}
     */
    getNextAvailableId() {
        return utils.findFirstHoleInSequence(this.allIds())
    }

    /**
     * Add a new text, or update an existing one if the ID exists.
     *
     * @param {object} containing 'string' (required) and 'id' (optional)
     * If omitted, id will be next highest value.
     * @return {Promise} returning the created Text object
     */
    add(args) {
        let text = this._createOrUpdate(args)
        return text.apply().return(text)
    }

    /**
     * Create or update a text. Unlike add(), does not inform Snowmix.
     *
     * @param {object} containing 'name' (required) and 'id' (optional)
     * If omitted, id will be next highest value.
     * @private
     */
    _createOrUpdate(args) {
        let text
        if (args.hasOwnProperty('id')) text = this.byId(args.id)
        if (text) { // update
            Object.assign(text, args)
        }
        else { // create
            if (!args.hasOwnProperty('id')) args.id = this.getNextAvailableId()
            text = new SnowmixText(this.snowmix, args.id, args)
            this.texts.push(text)
        }

        return text
    }

    /**
     * Analyses the 'Show' command to look for 'text overlay 1 2 3' and discover
     * which text IDs are showing. This then populates the 'showing' property.
     * @private
     */
    discoverShowingIds() {
        return this.snowmix.commands.getLinesThatMatch(/^text overlay\s*(.+)$/, 'Show')
        .then(textOverlayCommands => {
            let ids = []
            Object.keys(textOverlayCommands).forEach(lineNumber => {
                ids = ids.concat(textOverlayCommands[lineNumber][1].split(' ').map(_.toNumber))
            })

            return ids
        })
    }

    /**
     * Run automatically when Snowmix is connected to discover all texts.
     * @private
     */
    populate() {
        return this._parseTextStringCommand()
        .then((idsAndStrings) => {
            return this.discoverShowingIds()
            .then(showingIds => {
                return this._parseTextInfoCommand(idsAndStrings, showingIds)
            })
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
     * Parse 'text info' and put results into this.texts
     * @private
     */
    _parseTextInfoCommand(idsAndStrings, showingIds) {
        return this.snowmix.sendCommand('text info', { tidy: true, expectMultiline: true, logAtSillyLevel: true })
        .then(lines => {
            lines.forEach(l => {
                let match

                if (l.match(/^\s*text place info\s*$/)) return
                if (match = l.match(/^\s*placed texts\s*:\s*(\d+)\s*$/)) return

                if (match = l.match(/^\s*max placed texts\s*:\s*(\d+)\s*$/)) {
                    this.maxTexts = match[1]
                    return
                }

                if (match = l.match(/^\s*verbose level\s*:\s*(\d+)\s*$/)) {
                    this.verboseLevel = match[1]
                    return
                }

                if (l.match(/^\s*text place id : str_id font_id pos offset wxh align anchor scale rot col clip pad colbg clipbg\s*$/)) return

                if (match = l.match(/^\s*text place\s*(\d+)\s*:\s*(.+)$/)) {
                    let id = parseInt(match[1])
                    let details = match[2].split(' ')
                    if (!idsAndStrings[id]) {
                        logger.debug('Text id %d is known by [text place] but not [text string], omitting', id)
                        return
                    }
                    this._createOrUpdate({
                        id: id,
                        showing: showingIds.indexOf(id) !== -1,
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
