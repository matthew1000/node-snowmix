'use strict'
/**
 * # Snowmix/Commands
 *
 * Handles the manipulation of Snowmix commands (aka functions)
 *
 */
const _ = require('lodash'),
      Promise = require('bluebird'),
      logger = require('./logger')

class SnowmixCommands {

    constructor(snowmix) {
        this.snowmix = snowmix
    }

    /**
     * List the lines of a command
     *
     * @param {String} commandName
     * @return (Promise of an) array where the first entry is always undefined.
     * If the command does not exist, returns undefined.
     * If the command has no contents, returns [undefined]
     * @example snowmix.command.listCommand('Show').then(arrayOfLines => { ... })
     */
    listCommand(commandName, args) {
        let listCommand = `command list ${commandName}`
        return this.snowmix.sendCommand(listCommand, { tidy: true, expectMultiline: true })
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
     * @return Promise
     */
    createCommand(commandName, lines) {
        let linesToCreateCommand = [
            `command delete ${commandName}`,
            `command create ${commandName}`
            ]
            .concat(lines)
            .concat('command end')
        return this.snowmix.sendCommand(linesToCreateCommand)
    }

    /**
     * updates the 'Show' Snowmix command to contain the relevant overlay commands
     */
    updateShowCommand() {
        return Promise.all([
            this.getCommandsToDeleteLinesThatMatch(/^(text|vfeed) overlay/, 'Show'),
            this.snowmix.texts.getShowingIds(),
            this.snowmix.vfeeds.getShowingIds()
        ]).spread((commandsToDoUpdate, visibleTextIds, visibleVirtualFeeds) => {

            // Do text lines before vfeed lines, it seems to work better that way
            if (visibleTextIds.length) commandsToDoUpdate.push
                (`command addatline Show 1 text overlay ` + visibleTextIds.join(' '))
            if (visibleVirtualFeeds.length) commandsToDoUpdate.push
                (`command addatline Show 1 vfeed overlay ` + visibleVirtualFeeds.join(' '))

            return this.snowmix.sendCommand(commandsToDoUpdate, {tidy: true, expectResponse: false})
        })
    }

    /**
     * Given a line to match, and an array of lines of a command, returns the commands
     * required to delete those lines.
     *
     * @private
     */
    getCommandsToDeleteLinesThatMatch(regexp, commandName) {
        return this.listCommand(commandName)
        .then(arrayOfLines => {
            let lineNumbers = []
            arrayOfLines.forEach((line, lineNumber) => {
                if (lineNumber === 0) return
                if (line.match(regexp)) lineNumbers.push(lineNumber)
            })

            // Delete in reverse order, otherwise they all shuffle down!
            let deleteCommands = lineNumbers.sort((a,b)=>b-a).map(n => { return `command deleteline ${commandName} ${n}` })
            return deleteCommands
        })
    }

    /**
     * Resets the Show command to containing nothing apart from the essential 'loop'
     */
    resetShowCommand() {
        return this.sendCommand([
            'command delete Show',
            'command create Show',
            'loop',
            'command end'
        ])
    }
}

module.exports = SnowmixCommands
