'use strict'
const winston = require('winston')

const colorize = process.env.LOG_COLORIZE !== 'false'
const level = process.env.LOG_LEVEL || 'warn'

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            level    : level,
            colorize : colorize,
            timestamp: true
    })]
})

exports.silly = logger.silly
exports.debug = logger.debug
exports.info = logger.info
exports.warn = logger.warn
exports.error = logger.error
