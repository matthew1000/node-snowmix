'use strict'
const _ = require('lodash'),
    Promise = require('bluebird'),
    logger = require('./logger'),
    SnowmixImage = require('./Image'),
    SnowmixItemCollection = require('./SnowmixItemCollection')

/**
 * Handles all images
 *
 * @extends SnowmixItemCollection
 */
class Images extends SnowmixItemCollection {

    constructor (snowmix) {
        super(snowmix)
        this.itemName = SnowmixImage
    }

    add(args) {
        // populate after adding to get details about the loaded image (i.e. width & height)
        return super.add(args).then(() => {
            return this.populate()
        })
    }

    /**
     * Run automatically when Snowmix is connected to discover all images.
     * @private
     */
    populate() {
        return this.snowmix.sendCommand('image load', { tidy: true, expectMultiline: true, logAtSillyLevel: true })
        .then(lines => {
            lines.forEach(l => {
                if (l.match(/^\s*image load\s*$/)) return
                let match = l.match(/^\s*image load\s*(\d+)\s*<(.+)>\s*(\d+)x(\d+)\s*/)
                if (match) {
                    this._createOrUpdate({
                        id: parseInt(match[1]),
                        filename: match[2],
                        width: parseInt(match[3]),
                        height: parseInt(match[4]),
                    })
                }
                else {
                    logger.warn('Unexpected line in \'image load\':', l)
                }
            })
        })
    }
}

module.exports = Images
