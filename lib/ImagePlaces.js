'use strict'
const _ = require('lodash'),
    Promise = require('bluebird'),
    logger = require('./logger'),
    SnowmixImagePlace = require('./ImagePlace'),
    SnowmixItemCollection = require('./SnowmixItemCollection')

/**
 * A collection of all ImagePlaces (that is, places where images can go on the video.)
 *
 * @extends SnowmixItemCollection
 * @example snowmix.images.byId(1).addPlace.then(p => { ... })
 */
class ImagePlaces extends SnowmixItemCollection {

    constructor (snowmix) {
        super(snowmix)
        this.itemName = SnowmixImagePlace
    }

    /**
     * Returns the IDs of all Texts that are showing (visible).
     * @return {array}
     */
    getShowingIds() {
        return this.items.filter(t => t.showing).map(t => t.id)
    }

    /**
     * Create a new image place. For ease, use image.addPlace()
     * @return {ImagePlace}
     */
    create(args) {
        // populate after adding to get details about the loaded ImagePlace
        return super.create(args).then(imagePlace => {
            return this.populate().return(imagePlace)
        })
    }

    /**
     * Run automatically when Snowmix is connected to discover all image places.
     * @private
     */
    populate() {
        return this.snowmix.sendCommand('image place', { tidy: true, expectMultiline: true, logAtSillyLevel: true })
        .then(lines => {
            lines.forEach(l => {
                if (l.match(/^\s*image place\s*$/)) return

                let mainMatch = l.match(/^\s*image place id\s*(\d+)\s*image_id\s*(\d+)\s*x,y\s*(-?\d+),(-?\d+)\s*wxh\s*(-?\d+)x(-?\d+)\s*rot\s*([.\d]+)\s*alpha\s*([.\d]+)\s*anchor\s*(\d+),(\d+)\s*(left|center|right)\s*(top|middle|bottom)\s*(on|off)\s*$/)

                if (mainMatch) {
                    let place = {
                        id: parseInt(mainMatch[1]),
                        imageId: parseInt(mainMatch[2]),
                        x: parseInt(mainMatch[3]),
                        y: parseInt(mainMatch[4]),
                        width: parseInt(mainMatch[5]),
                        height: parseInt(mainMatch[6]),
                        rotation: _.toNumber(mainMatch[7]),
                        alpha: _.toNumber(mainMatch[8]),
                        anchorX: parseInt(mainMatch[9]),
                        anchorY: parseInt(mainMatch[10]),
                        horizontalAlign: mainMatch[11],
                        verticalAlign: mainMatch[12]
                    }
                    this._createOrUpdate(place)
                }
                else {
                    logger.warn('Unexpected \image place\' response line:', l)
                }
            })
        })
    }

}

module.exports = ImagePlaces
