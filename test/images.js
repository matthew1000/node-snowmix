#!/usr/bin/env node
'use strict'
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    expect = require('chai').expect,
    logger = require('../lib/logger')

describe('AudioFeeds', function() {

    it('Connect to Snowmix which should load all initial images', function() {
        return snowmix.connect()
    })

    it('Remove any Images and ImagePlaces lying around', function() {
        return snowmix.images.deleteAll()
        .then(() => { return snowmix.imagePlaces.deleteAll()})
    })

    it('Initially be no Images or ImagePlaces', function() {
        expect(snowmix.images.all()).to.have.length(0)
        expect(snowmix.imagePlaces.all()).to.have.length(0)
    })

    it('create image #1', function() {
        return snowmix.images.add({id: 1, filename: __dirname + '/../examples/assets/cat.png'})
    })

    it('should have 1 image, with the correct details, and no ImagePlaces', function() {
        expect(snowmix.images.all()).to.have.length(1)
        expect(snowmix.imagePlaces.all()).to.have.length(0)
        expect(snowmix.images.byId(1).width).to.equal(640)
        expect(snowmix.images.byId(1).height).to.equal(426)
    })

    it('create ImagePlace #1 containing Image #1', function() {
        return snowmix.images.byId(1).addPlace({id: 1, x: 100, y: 200, location: 'n'})
    })

    it('should have 1 ImagePlace', function() {
        expect(snowmix.imagePlaces.all()).to.have.length(1)
        expect(snowmix.imagePlaces.byId(1).width).to.equal(640)
        expect(snowmix.imagePlaces.byId(1).height).to.equal(426)
        expect(snowmix.imagePlaces.byId(1).location).to.equal('n')
        expect(snowmix.imagePlaces.byId(1).rotation).to.equal(0)
        expect(snowmix.imagePlaces.byId(1).alpha).to.equal(1)
    })

    it('create image #2', function() {
        return snowmix.images.add({id: 2, filename: __dirname + '/../examples/assets/leopard.png'})
    })

    it('create ImagePlace #2 referring to image #1', function() {
        return snowmix.images.byId(1).addPlace({id: 2, x: 200})
    })

    it('create ImagePlace #3 referring to image #2', function() {
        return snowmix.images.byId(2).addPlace({id: 3, x: 300})
    })

    it('should have 2 Images and 3 ImagePlaces', function() {
        expect(snowmix.images.all()).to.have.length(2)
        expect(snowmix.imagePlaces.all()).to.have.length(3)
        expect(snowmix.imagePlaces.byId(1).image().id).to.equal(1)
        expect(snowmix.imagePlaces.byId(2).image().id).to.equal(1)
        expect(snowmix.imagePlaces.byId(3).image().id).to.equal(2)
        expect(snowmix.images.byId(1).places()).to.have.length(2)
        expect(snowmix.images.byId(2).places()).to.have.length(1)
    })

    it('Show image place 1', function() {
        return snowmix.imagePlaces.byId(1).show()
    })

    it('Check Show command is actually showing ImagePlace #1', function() {
        return snowmix.commands.list('Show')
        .then(cmds => {
            expect(cmds).to.contain('image overlay 1')
        })
    })

    it('Show image place 2 and 3', function() {
        return snowmix.imagePlaces.byId(2).show()
        .then(() => { return snowmix.imagePlaces.byId(3).show() })
    })

    it('Check Show command is actually showing all 3 places', function() {
        return snowmix.commands.list('Show')
        .then(cmds => {
            console.log(cmds)
            expect(cmds).to.contain('image overlay 1 2 3')
        })
    })

    it('Remove the Images and ImagePlaces created', function() {
        return snowmix.images.deleteAll()
        .then(() => { return snowmix.imagePlaces.deleteAll()})
    })

    it('Finally now be no Images or ImagePlaces', function() {
        expect(snowmix.images.all()).to.have.length(0)
        expect(snowmix.imagePlaces.all()).to.have.length(0)
    })

    it('Should close the Snowmix connection', function() {
        return snowmix.close()
    })

    it('Should have not caused any warnings or errors', function() {
        expect(logger.count.error).to.equal(0)
        expect(logger.count.warn).to.equal(0)
    })
})
