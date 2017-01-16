#!/usr/bin/env node
'use strict'
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    expect = require('chai').expect,
    logger = require('../lib/logger')

describe('Feeds', function() {

    it('Connect to Snowmix which should load all initial video feeds', function() {
        return snowmix.connect()
    })

    it('Initially be one feed, the Snowmix default', function() {
        expect(snowmix.feeds.all()).to.have.length(1)
        expect(snowmix.feeds.all()[0].id).to.equal(0)
        expect(snowmix.feeds.all()[0].name).to.equal('Internal')
    })

    it('create feed #1', function() {
        return snowmix.feeds._createOrUpdate({name: 'name1'})
    })

    it('Should be one feed with all()', function() {
        expect(snowmix.feeds.all()).to.have.length(2)
        let f = (snowmix.feeds.all())[1]
        expect(f).to.have.property('id')
        expect(f.id).to.equal(1)
        expect(f).to.have.property('name')
        expect(f.name).to.equal('name1')
    })

    it('create feed #2', function() {
        return snowmix.feeds._createOrUpdate({name: 'name2'})
    })

    it('Should be 3 feeds with all()', function() {
        expect(snowmix.feeds.all()).to.have.length(3)
    })

    it('Should be able to fetch the (video) feeds by ID', function() {
        expect(snowmix.feeds.byId(1).name).to.equal('name1')
        expect(snowmix.feeds.byId(2).name).to.equal('name2')
    })

    it('create feed #3 but give it ID #4', function() {
        return snowmix.feeds._createOrUpdate({name: 'name3-id4', id: 4})
    })

    it('should have IDS [0,1,2,4]', function() {
        expect(snowmix.feeds.allIds().sort()).to.deep.equal([0,1,2,4])
    })

    it('create two new feeds, they should get IDS 3 and 5', function() {
        snowmix.feeds._createOrUpdate({name: 'should-get-id-3'})
        snowmix.feeds._createOrUpdate({name: 'should-get-id-5'})
    })

    it('should have IDS [0,1,2,3,4,5]', function() {
        expect(snowmix.feeds.allIds().sort()).to.deep.equal([0,1,2,3,4,5])
        expect(snowmix.feeds.all()).to.have.length(6)
    })

    it('change name of feed #2', function() {
        return snowmix.feeds._createOrUpdate({name: 'new-name-for-2', id: 2})
    })

    it('check name has stuck and we haven\'t created a new feed', function() {
        expect(snowmix.feeds.all()).to.have.length(6)
        expect(snowmix.feeds.byId(2).name).to.equal('new-name-for-2')
    })

    it('Should close the Snowmix connection', function() {
        return snowmix.close()
    })

    it('Should have not caused any warnings or errors', function() {
        expect(logger.count.error).to.equal(0)
        expect(logger.count.warn).to.equal(0)
    })
})
