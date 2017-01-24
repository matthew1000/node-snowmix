#!/usr/bin/env node
'use strict'
const jsdoc2md = require('jsdoc-to-markdown'),
    fs = require('fs'),
    path = require('path'),
    libDir = __dirname + '/lib/',
    outputDir = __dirname + '/doc/'

jsdoc2md.render({ files: [__dirname + '/node-snowmix.js', libDir + '*.js'] })
.then(output => {
    fs.writeFileSync(path.resolve(outputDir, 'api.md'), output)
    console.log('Done')
})
