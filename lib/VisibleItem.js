'use strict'
const _ = require('lodash'),
    Promise = require('bluebird'),
    logger = require('./logger'),
    SnowmixItem = require('./SnowmixItem')

/**
 * @abstract
 * @extends SnowmixItem
 * Abstract superclass for an item that is visible on the video
 * i.e. Feed, Vfeed, Text, Image
 */
class VisibleItem extends SnowmixItem {

    /**
     * Shows the item. If already showing, does nothing.
     * @return {Promise}
     */
    show() {
        this.showing = true
        return this.snowmix.commands.updateShowCommand()
    }

    /**
     * Hides the item. If already not showing, does nothing.
     * @return {Promise}
     */
    hide() {
        this.showing = false
        return this.snowmix.commands.updateShowCommand()
    }

}

module.exports = VisibleItem
