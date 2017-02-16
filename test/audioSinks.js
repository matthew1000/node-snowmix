#!/usr/bin/env node
'use strict'
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    expect = require('chai').expect,
    logger = require('../lib/logger')

describe('AudioSinks', function() {
    it('Connect to Snowmix which should load all initial audioSinks', function() {
        return snowmix.connect()
    })

    it('Remove any audioSinks lying around', function() {
        return snowmix.audioSinks.deleteAll()
    })

    it('Initially be no audioSinks', function() {
        expect(snowmix.audioSinks.all()).to.have.length(0)
    })

    it('create audioSink #1', function() {
        return snowmix.audioSinks.add({name: 'name1'})
    })

    it('Should be one audioSink with all()', function() {
        expect(snowmix.audioSinks.all()).to.have.length(1)
        let f = (snowmix.audioSinks.all())[0]
        expect(f).to.have.property('id')
        expect(f.id).to.equal(1)
        expect(f).to.have.property('name')
        expect(f.name).to.equal('name1')
    })

    it('create audioSink #2', function() {
        return snowmix.audioSinks.add({name: 'name2'})
    })

    it('Should be 2 sinks with all()', function() {
        expect(snowmix.audioSinks.all()).to.have.length(2)
    })

    it('Should be able to fetch the sinks by ID', function() {
        expect(snowmix.audioSinks.byId(1).name).to.equal('name1')
        expect(snowmix.audioSinks.byId(2).name).to.equal('name2')
    })

    it('change name of audioSink #2', function() {
        return snowmix.audioSinks.add({name: 'new-name-for-2', id: 2})
    })

    it('check name has stuck and we haven\'t created a new audioSink', function() {
        expect(snowmix.audioSinks.all()).to.have.length(2)
        expect(snowmix.audioSinks.byId(2).name).to.equal('new-name-for-2')
    })

    it('should repopulate from snowmix', function() {
        return snowmix.populate()
    })

    it('Should have the same details after repopulating', function() {
        expect(snowmix.audioSinks.all()).to.have.length(2)
        expect(snowmix.audioSinks.byId(1).name).to.equal('name1')
        expect(snowmix.audioSinks.byId(2).name).to.equal('new-name-for-2')
    })

    it('Remove remove the audioSinks', function() {
        return snowmix.audioSinks.deleteAll()
    })

    it('Should close the Snowmix connection', function() {
        return snowmix.close()
    })

    it('Should have not caused any warnings or errors', function() {
        expect(logger.count.error).to.equal(0)
        expect(logger.count.warn).to.equal(0)
    })
})
