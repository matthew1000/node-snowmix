#!/usr/bin/env node
'use strict'
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    expect = require('chai').expect

let testLines = ['foo', 'bar']

it('Connect to Snowmix', function() {
    return snowmix.connect()
})

it('Should make testCommand1() command', function() {
    return snowmix.commands.create('testCommand1', testLines)
})

it('check foo() command', function() {
    return snowmix.commands.list('testCommand1')
    .then(lines => {
        expect(lines).to.deep.equal([undefined].concat(testLines))
    })
})

it('Should handle the checking of a command that does not exist', function() {
    return snowmix.commands.list('rubbish')
    .then(lines => {
        expect(lines).to.be.undefined
    })
})

it('Should get a list of all commands, including testCommand1', function() {
    return snowmix.commands.listAll()
    .then(lines => {
        expect(lines).to.contain('testCommand1')
    })
})

it('Should delete a function', function() {
    return snowmix.commands.delete('testCommand1')
})

it('Should get a list of all commands, including testCommand1', function() {
    return snowmix.commands.listAll()
    .then(lines => {
        expect(lines).to.not.contain('testCommand1')
    })
})

it('Should close the Snowmix connection', function() {
    return snowmix.close()
})
