'use strict'
const _ = require('lodash'),
    Promise = require('bluebird'),
    logger = require('./logger'),
    SnowmixItem = require('./SnowmixItem')

const defaults = {}

/**
 * An image placed on the video.
 *
 * @extends SnowmixItem
 * @property {integer} id
 * @property {integer} imageId
 * @property {integer} x
 * @property {integer} y
 * @property {string} location (n | s | e | w | c | ne | nw | se | sw)
 * @property {string} horizontalAlign (left | center | right)
 * @property {string} verticalAlign (top | middle | bottom)
 */
class ImagePlace extends SnowmixItem {

    constructor(snowmix, id, args) {
        super(snowmix, id, args)
        args.imageId = parseInt(args.imageId)
    }

    /**
     * @return {Image} the corresponding image
     */
    image() {
        return this.snowmix.images.byId(this.imageId)
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
        if (!this.filename) throw new Error('Cannot apply text, no filename')
        return this.snowmix.sendCommand(this.applyCommands(), {tidy: true, expectResponse: false})
    }

    /**
     * Shows the image. If already showing, does nothing.
     * @return {Promise}
     */
    show() {
        this.showing = true
        return this.snowmix.commands.updateShowCommand()
    }

    /**
     * Hides the image. If already hiding, does nothing.
     * @return {Promise}
     */
    hide() {
        this.showing = false
        return this.snowmix.commands.updateShowCommand()
    }

    /**
     * @return {String} the 'image place' command that will apply this place in Snowmix
     */
    applyCommands() {
        let parameters = []
        parameters.push(this.id || 1)
        parameters.push(this.imageId)
        parameters.push(this.x || 0)
        parameters.push(this.y || 0)
        parameters.push(this.location || 'nw')
        parameters.push(this.horizontalAlign || 'left')
        parameters.push(this.verticalAlign || 'top')

        // Command doc at https://sourceforge.net/p/snowmix/wiki/Reference%20Images/#image-place
        return [`image place ${parameters.join(' ')}`]
    }

    addOrReplaceImagePlace(args) {

    }
}

module.exports = ImagePlace
