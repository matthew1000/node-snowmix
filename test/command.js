#!/usr/bin/env node
'use strict'
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    expect = require('chai').expect

let testLines = ['foo', 'bar']

it('Connect to Snowmix', function() {
    return snowmix.connect()
})

it('Should make foo() command', function() {
    return snowmix.commands.createCommand('testCommand1', testLines)
})

it('check foo() command', function() {
    return snowmix.commands.listCommand('testCommand1')
    .then(lines => {
        expect(lines).to.deep.equal([undefined].concat(testLines))
    })
})

it('Should handle the checking of a command that does not exist', function() {
    return snowmix.commands.listCommand('rubbish')
    .then(lines => {
        expect(lines).to.be.undefined
    })
})

it('Should close the Snowmix connection', function() {
    return snowmix.close()
})
