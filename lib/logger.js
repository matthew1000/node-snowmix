'use strict'
const winston = require('winston')

const colorize = process.env.LOG_COLORIZE !== 'false'
const level = process.env.LOG_LEVEL || 'warn'
exports.count = { error: 0, warn: 0 }

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            level    : level,
            colorize : colorize,
            timestamp: true
        })
    ]
})

exports.silly = logger.silly
exports.debug = logger.debug
exports.info = logger.info

exports.warn = function() {
    exports.count.warn++
    Reflect.apply(logger.warn, logger, arguments)
}

exports.error = function() {
    exports.count.error++
    Reflect.apply(logger.error, logger, arguments)
}
