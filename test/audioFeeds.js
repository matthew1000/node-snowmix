#!/usr/bin/env node
'use strict'
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    expect = require('chai').expect,
    logger = require('../lib/logger')

describe('AudioFeeds', function() {

    it('Connect to Snowmix which should load all initial audioFeeds', function() {
        return snowmix.connect()
    })

    it('Remove any audioFeeds lying around', function() {
        return snowmix.audioFeeds.removeAll()
    })

    it('Initially be no audioFeeds', function() {
        expect(snowmix.audioFeeds.all()).to.have.length(0)
    })

    it('create audioFeed #1', function() {
        return snowmix.audioFeeds.add({name: 'name1'})
    })

    it('Should be one audioFeed with all()', function() {
        expect(snowmix.audioFeeds.all()).to.have.length(1)
        let f = (snowmix.audioFeeds.all())[0]
        expect(f).to.have.property('id')
        expect(f.id).to.equal(1)
        expect(f).to.have.property('name')
        expect(f.name).to.equal('name1')
    })

    it('create audioFeed #2', function() {
        return snowmix.audioFeeds.add({name: 'name2'})
    })

    it('Should be 2 feeds with all()', function() {
        expect(snowmix.audioFeeds.all()).to.have.length(2)
    })

    it('Should be able to fetch the audioFeeds by ID', function() {
        expect(snowmix.audioFeeds.byId(1).name).to.equal('name1')
        expect(snowmix.audioFeeds.byId(2).name).to.equal('name2')
    })

    it('change name of audioFeed #2', function() {
        return snowmix.audioFeeds.add({name: 'new-name-for-2', id: 2})
    })

    it('check name has stuck and we haven\'t created a new feed', function() {
        expect(snowmix.audioFeeds.all()).to.have.length(2)
        expect(snowmix.audioFeeds.byId(2).name).to.equal('new-name-for-2')
    })

    it('should repopulate from snowmix', function() {
        return snowmix.populate()
    })

    it('Should have the same details after repopulating', function() {
        expect(snowmix.audioFeeds.all()).to.have.length(2)
        expect(snowmix.audioFeeds.byId(1).name).to.equal('name1')
        expect(snowmix.audioFeeds.byId(2).name).to.equal('new-name-for-2')
    })

    it('Should close the Snowmix connection', function() {
        return snowmix.close()
    })

    it('Should have not caused any warnings or errors', function() {
        expect(logger.count.error).to.equal(0)
        expect(logger.count.warn).to.equal(0)
    })
})
