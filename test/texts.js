'use strict'
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    expect = require('chai').expect

it('should connect', function() {
    return snowmix.connect()
})

it('should create text 1', function() {
    return snowmix.texts.add({
        string: 'north-west',
        location: 'nw',
        offset: [200, 100]
    })
})

it('should have 1 text object', () => {
    expect(snowmix.texts.all()).to.have.length(1)
    expect(snowmix.texts.allIds()).to.deep.equal([1])
})

it('should show text 1', function() {
    return snowmix.texts.byId(1).show()
})

it('should show text 2', function() {
    return snowmix.texts.add({
        string: 'north-east',
        location: 'ne',
    })
    .then(text => {
        text.show()
    })
})

it('should have two text objects', () => {
    expect(snowmix.texts.all()).to.have.length(2)
    expect(snowmix.texts.allIds()).to.deep.equal([1,2])
})

it('should show text 3', function() {
    return snowmix.texts.add({
        string: 'south-west',
        location: 'sw',
    })
    .then(text => {
        text.show()
    })
})

it('should show text 4', function() {
    return snowmix.texts.add({
        string: 'south-east',
        location: 'se',
    })
    .then(text => {
        text.show()
    })
})

it('Should close the Snowmix connection', function() {
    return snowmix.close()
})
