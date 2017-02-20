'use strict'
const _ = require('lodash'),
    Promise = require('bluebird'),
    logger = require('./logger'),
    SnowmixItem = require('./SnowmixItem')

/**
 * An image, that can be overlayed on the video.
 *
 * @extends SnowmixItem
 * Create with snowmix.images.create(...)
 * @example
 *   var myImage1 = snowmix.images.create({ filename: '/path/to/file.png' })
 *   myImage1.applyAndShow().then(() => { ... })
 *
 * @property {integer} id
 * @property {string} filename
 */
class Image extends SnowmixItem {

    constructor(snowmix, id, args) {
        super(snowmix, id, args)
    }

    /**
     * Returns the 0 or more places for this image to be placed on the video.
     * (A place defines where the image should be on the video.)
     * @return {Array} of ImagePlace objects
     */
    places() {
        return this.snowmix.imagePlaces.all().filter(p => p.imageId === this.id)
    }

    /**
     * Add (or update existing) a place for this image to go.
     * @param {object} of imagePlace properties (id, x, y, etc)
     * If no id is provided, one is assigned automatically.
     */
    addPlace(args = {}) {
        if (!args) args = {}
        args.imageId = this.id
        return this.snowmix.imagePlaces.create(args)
    }

    /**
     * Inform Snowmix of the current image.
     * An equivalent apply() method is available for the image places.
     * @return {Promise}
     */
    apply() {
        if (!this.filename) throw new Error('Cannot apply text, no filename')
        return this.snowmix.sendCommand(this.applyCommands(), {tidy: true, expectResponse: false})
    }

    /**
     * @return {String} load command for this image
     */
    applyCommands() {
        return [`image load ${this.id} ${this.filename}`]
    }

    /**
     * Delete this Image
     * @return {Promise}
     */
    delete() {
        this.snowmix.images.removeFromInternalList(this)
        return this.snowmix.sendCommand(`image load ${this.id}`, { tidy: true, expectResponse: false })
    }

}

module.exports = Image
