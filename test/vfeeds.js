#!/usr/bin/env node
'use strict'
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    expect = require('chai').expect,
    logger = require('../lib/logger')

describe('Vfeeds', function() {

    it('Connect to Snowmix which should load all initial vfeeds', function() {
        return snowmix.connect()
    })

    it('Remove any vfeeds lying around', function() {
        return snowmix.vfeeds.removeAll()
    })

    it('Initially be no vfeeds', function() {
        expect(snowmix.vfeeds.all()).to.have.length(0)
    })

    it('create a feed so that we can then make a vfeed', function() {
        return snowmix.feeds.add({name: 'feed1', sourceId: 1})
    })

    it('create vfeed #1', function() {
        return snowmix.vfeeds.add({name: 'name1', sourceId: 1, source: 'feed'})
    })

    it('Should be one vfeed with all()', function() {
        expect(snowmix.vfeeds.all()).to.have.length(1)
        let f = (snowmix.vfeeds.all())[0]
        expect(f).to.have.property('id')
        expect(f.id).to.equal(1)
        expect(f).to.have.property('name')
        expect(f.name).to.equal('name1')
    })

    it('create vfeed #2', function() {
        return snowmix.vfeeds.add({name: 'name2', sourceId: 1, source: 'feed'})
    })

    it('Should be 2 feeds with all()', function() {
        expect(snowmix.vfeeds.all()).to.have.length(2)
    })

    it('Should be able to fetch the vfeeds by ID', function() {
        expect(snowmix.vfeeds.byId(1).name).to.equal('name1')
        expect(snowmix.vfeeds.byId(2).name).to.equal('name2')
    })

    it('change name of vfeed #2', function() {
        return snowmix.vfeeds.add({name: 'new-name-for-2', id: 2})
    })

    it('check name has stuck and we haven\'t created a new feed', function() {
        expect(snowmix.vfeeds.all()).to.have.length(2)
        expect(snowmix.vfeeds.byId(2).name).to.equal('new-name-for-2')
    })

    it('should repopulate from snowmix', function() {
        return snowmix.populate()
    })

    it('Should have the same details after repopulating', function() {
        expect(snowmix.vfeeds.all()).to.have.length(2)
        expect(snowmix.vfeeds.byId(1).name).to.equal('name1')
        expect(snowmix.vfeeds.byId(2).name).to.equal('new-name-for-2')
    })

    it('Should close the Snowmix connection', function() {
        return snowmix.close()
    })

    it('Should have not caused any warnings or errors', function() {
        expect(logger.count.error).to.equal(0)
        expect(logger.count.warn).to.equal(0)
    })
})
