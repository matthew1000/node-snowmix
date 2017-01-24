'use strict'
const _ = require('lodash'),
      Promise = require('bluebird'),
      logger = require('./logger')

/**
 * snowmix.commands - handles the manipulation of Snowmix commands (aka functions)
 * @example snowmix.commands.list('Show').then(arrayOfLines => { ... })
 */
class SnowmixCommands {

    constructor(snowmix) {
        this.snowmix = snowmix
    }

    /**
     * Get the name of all commands
     * @return {Array} of strings
     * @example snowmix.commands.listAll().then(arrayOfCommmandNames => { ... })
     */
    listAll() {
        return this.snowmix.sendCommand('command list', { tidy: true, expectMultiline: true })
    }

    /**
     * List the lines of a command
     *
     * @param {String} commandName
     * @return {Promise} of an array where the first entry is always undefined.
     * If the command does not exist, returns undefined.
     * If the command has no contents, returns [undefined]
     * @example snowmix.commands.list('Show').then(arrayOfLines => { ... })
     */
    list(commandName, args) {
        return this.snowmix.sendCommand(`command list ${commandName}`, { tidy: true, expectMultiline: true })
        .then(response => {
            if (response.length === 1 && response[0].match(/Invalid parameters/))
                return undefined

            let lines = [undefined]
            response.forEach(line => {
                let matches = line.match(/^\s*(\d+):\s+(.+?)\s*$/)
                if (matches) {
                    let lineNumber = matches[1]
                    let actualLine = matches[2]
                    lines[lineNumber] = actualLine
                }
            })
            return lines
        })
    }

    /**
     * Create a command. Replaces any that already exist with this name.
     *
     * @param {String} commandName
     * @param {Array} Lines for command
     * @return {Promise}
     */
    create(commandName, lines) {
        let linesToCreateCommand = [
            `command delete ${commandName}`,
            `command create ${commandName}`
            ]
            .concat(lines)
            .concat('command end')
        return this.snowmix.sendCommand(linesToCreateCommand, {tidy: true})
    }

    /**
     * Delete a command
     * Note if the command does not exist it will create a warning
     * (due to Snowmix's way of not responding unless it cannot be found)
     *
     * @param {String} commandName
     * @return {Promise}
     */
    delete(name) {
        return this.snowmix.sendCommand(`command delete ${name}`, {expectResponse: false})
    }

    /**
     * updates the 'Show' Snowmix command to contain the relevant overlay commands
     * @return {Promise}
     */
    updateShowCommand() {
        return Promise.all([
            this.snowmix.texts.getShowingIds(),
            this.snowmix.vfeeds.getShowingIds(),
            this.list('Show')
        ]).spread((visibleTextIds, visibleVirtualFeeds, showCommandLines) => {
            //
            // This bit handles the case where the Show command does not exist.
            // An alternative implementation would be to create it below.
            //
            if (showCommandLines === undefined) {
                return this.resetShowCommand().then(() => {
                    return this.list('Show').then(newShowCommandLines => {
                        return [visibleTextIds, visibleVirtualFeeds, newShowCommandLines]
                    })
                })
            }
            else {
                return [visibleTextIds, visibleVirtualFeeds, showCommandLines]
            }
        }).spread((visibleTextIds, visibleVirtualFeeds, showCommandLines) => {
            let commandsToDoUpdate = []
            let numShowCommandLines = showCommandLines.length

            // We must add lines to the penultimate line of the command.
            // This is because the final line must always be 'loop'
            let placeToAddNewCommands = numShowCommandLines <= 1 ? 1 : numShowCommandLines - 1

            // Do text lines before vfeed lines, it seems to work better that way
            if (visibleTextIds.length) commandsToDoUpdate.push
                (`command addatline Show ${placeToAddNewCommands} text overlay ` + visibleTextIds.join(' '))
            if (visibleVirtualFeeds.length) commandsToDoUpdate.push
                (`command addatline Show ${placeToAddNewCommands} vfeed overlay ` + visibleVirtualFeeds.join(' '))

            return this.getCommandsToDeleteLinesThatMatch(/^(text|vfeed) overlay/, 'Show', 0)
            .then(commandsToDoDelete => {
                commandsToDoUpdate = commandsToDoUpdate.concat(commandsToDoDelete)
                return this.snowmix.sendCommand(commandsToDoUpdate, {tidy: true, expectResponse: false})
            })
        })
    }

    /**
     * Given a line to match, and a command name, returns the matching line numbers and lines.
     * @private
     */
    getLinesThatMatch(regexp, commandName) {
        return this.list(commandName)
        .then(arrayOfLines => {
            if (arrayOfLines === undefined) return {} // means command does not exist
            let matching = {}
            arrayOfLines.forEach((line, lineNumber) => {
                if (lineNumber === 0) return
                let match
                if (match = line.match(regexp)) matching[lineNumber] = match
            })

            return matching
        })
    }

    /**
     * Returns commands to delete matching lines of a command
     * @private
     */
    getCommandsToDeleteLinesThatMatch(regexp, commandName, offset) {
        if (!offset) offset = 0
        return this.getLinesThatMatch(regexp, commandName)
        .then(matching => {
            let lineNumbers = Object.keys(matching).map(_.toNumber)

            // Delete in reverse order, otherwise they all shuffle down!
            let deleteCommands = lineNumbers.sort((a,b)=>b-a)
            .map(n => { return `command deleteline ${commandName} ${n+offset}` })
            return deleteCommands
        })
    }

    /**
     * Resets the Show command to containing nothing apart from the essential 'loop'
     * @return {Promise}
     */
    resetShowCommand() {
        return this.snowmix.sendCommand([
            'command delete Show',
            'command create Show',
            'loop',
            'command end'
        ])
    }
}

module.exports = SnowmixCommands
