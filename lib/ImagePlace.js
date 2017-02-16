'use strict'
const _ = require('lodash'),
    Promise = require('bluebird'),
    logger = require('./logger'),
    VisibleItem = require('./VisibleItem')

/**
 * An image placed on the video.
 *
 * @extends VisibleItem
 * @property {integer} id
 * @property {integer} imageId
 * @property {integer} x
 * @property {integer} y
 * @property {string} location (n | s | e | w | c | ne | nw | se | sw)
 * @property {string} horizontalAlign (left | center | right)
 * @property {string} verticalAlign (top | middle | bottom)
 * @example
 *   snowmix.images.byId(1).addPlace()
 *   .then(place => { return place.show() })
 */
class ImagePlace extends VisibleItem {

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
        return this.snowmix.sendCommand(this.applyCommands(), {tidy: true, expectResponse: false})
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

    /**
     * Remove this ImagePlace from Snowmix
     * @return {Promise}
     */
    remove() {
        this.snowmix.imagePlaces.removeFromInternalList(this)
        let removePromise = this.snowmix.sendCommand(`image place ${this.id}`, { tidy: true, expectResponse: false })

        // If showing, we must remove from the Show command
        if (this.showing) {
            return removePromise.then(() => { return this.snowmix.commands.updateShowCommand() })
        }
        else {
            return removePromise
        }
    }
}

module.exports = ImagePlace
