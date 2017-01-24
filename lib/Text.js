'use strict'
const _ = require('lodash'),
      Promise = require('bluebird'),
      logger = require('./logger'),
      SnowmixItem = require('./SnowmixItem')

const defaults = {
    string: '',
    fontName: 'Sans Bold',
    fontSize: 24,
    location: 'sw',
    red: 1,
    green: 1,
    blue: 1,
    alpha: 1,
}

const defaultsBasedOnLocation = {
    'sw' : {
        horizontalAlign: 'left',
        verticalAlign: 'bottom',
        x: 50,
        y: -50
    },
    'nw' : {
        horizontalAlign: 'top',
        verticalAlign: 'left',
        x: 50,
        y: 50
    },
    'ne' : {
        horizontalAlign: 'top',
        verticalAlign: 'right',
        x: -50,
        y: 50
    },
    'se' : {
        horizontalAlign: 'right',
        verticalAlign: 'bottom',
        x: -50,
        y: -50
    },
}

/**
 * A Text object (that can be placed on a video).
 *
 * @extends SnowmixItem
 * @example
 *   var myText1 = snowmix.texts.add({ string: 'Snowmix is great!' })
 *   myText1.applyAndShow()
 *   .then(() => { ... })
 * @property {integer} id
 * @property {integer} string
 * @property {integer} fontId
 * @property anchor
 * @property offset
 */
class Text extends SnowmixItem {

    constructor(snowmix, id, args) {
        super(snowmix)
        this.id = parseInt(id)
        Object.keys(args).forEach(arg => { this[arg] = args[arg] })
    }

    /**
     * Inform Snowmix of the current settings, and then ensure it's visible.
     */
    applyAndShow() {
        return this.apply()
        .then(() => { return this.show() })
    }

    /**
     * Inform Snowmix of the current settings.
     * Does not show or hide it (for that, use show() or hide())
     * @return {Promise}
     */
    apply() {
        // Send string command first, as Snowmix responds separately to that:
        return this.snowmix.sendCommand(this.stringCommand(), { tidy: true })
        .then(() => {
            return this.snowmix.sendCommand(this.commandsExceptStringCommand(), { tidy: true })
        })
    }

    /**
     * Shows the text. If already showing, does nothing.
     * @return {Promise}
     */
    show() {
        this.showing = true
        return this.snowmix.commands.updateShowCommand('text')
    }

    /**
     * Hides the text. If already hiding, does nothing.
     * @return {Promise}
     */
    hide() {
        this.showing = false
        return this.snowmix.commands.updateShowCommand('text')
    }

    /**
     * Return all commands except the 'string' command.
     * This is becuase Snowmix responds differently to the string and other commands
     */
    commandsExceptStringCommand() {
        return [
            this.fontCommand(),
            this.placeCommand(),
            this.backgroundCommand(),
            this.alignCommand(),
        ]
    }

    stringCommand() {
        return `text string ${this.id} ${this.string}`
    }

    fontCommand() {
        return `text font ${this.id} ${_.defaultTo(this.fontName, defaults.fontName)} ${_.defaultTo(this.fontSize, defaults.fontSize)}`
    }

    placeCommand() {
        // text place [<place id> [<string_id> <font_id> <x> <y> [<red> <green> <blue> [<alpha> [(n | s | e | w | c | ne | nw | se | sw)]]]]]
        let values = { id: this.id }
        values.location = _.defaultTo(this.location, defaults.location)
        values.x = _.defaultTo(this.x, defaultsBasedOnLocation[values.location].x)
        values.y = _.defaultTo(this.y, defaultsBasedOnLocation[values.location].y)

        let colourFields = ['red', 'green', 'blue', 'alpha']
        colourFields.forEach(c => {
            values[c] = _.defaultTo(this[c], defaults[c])
            if (values[c] === 1) values[c] = '1.0'
        })

        let parameters = ['id', 'id', 'id', 'x', 'y', 'red', 'green', 'blue', 'alpha', 'location']
        return `text place ${parameters.map(f => values[f]).join(' ')}`
    }

    backgroundCommand() {
        // text backgr [<place id> [ <l_pad> <r_pad> <t_pad> <b_pad> [<red> <green> <blue> <alpha>]]]  // <place id> only deletes backgr entry
        return `text backgr ${this.id} 10 10 10 10 0 0 0 0.8`
    }

    alignCommand() {
        // text align [<place id> (left | center | right) (top | middle | bottom) [<rotation>]
        let location = _.defaultTo(this.location, defaults.location)
        let horizontalAlign = _.defaultTo(this.horizontalAlign, defaultsBasedOnLocation[location].horizontalAlign)
        let verticalAlign = _.defaultTo(this.verticalAlign, defaultsBasedOnLocation[location].verticalAlign)

        let parameters = [horizontalAlign, verticalAlign]
        if (this.rotation) parameters.push(this.rotation)

        return `text align ${this.id} ${parameters.join(' ')}`
    }

    overlayCommand() {
        return `text overlay ${this.id}`
    }
}

module.exports = Text
