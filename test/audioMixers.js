#!/usr/bin/env node
'use strict'
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    expect = require('chai').expect,
    logger = require('../lib/logger')

describe('AudioMixers', function() {
    it('Connect to Snowmix which should load all initial audioMixers', function() {
        return snowmix.connect()
    })

    it('Remove any audioMixers lying around', function() {
        return snowmix.audioMixers.deleteAll()
    })

    it('Initially be no audioMixers', function() {
        expect(snowmix.audioMixers.all()).to.have.length(0)
    })

    it('create audioMixer #1', function() {
        return snowmix.audioMixers.create({name: 'name1'})
    })

    it('Should be one audioMixer with all()', function() {
        expect(snowmix.audioMixers.all()).to.have.length(1)
        let f = (snowmix.audioMixers.all())[0]
        expect(f).to.have.property('id')
        expect(f.id).to.equal(1)
        expect(f).to.have.property('name')
        expect(f.name).to.equal('name1')
    })

    it('create audioMixer #2', function() {
        return snowmix.audioMixers.create({name: 'name2'})
    })

    it('Should be 2 mixers with all()', function() {
        expect(snowmix.audioMixers.all()).to.have.length(2)
    })

    it('Should be able to fetch the mixers by ID', function() {
        expect(snowmix.audioMixers.byId(1).name).to.equal('name1')
        expect(snowmix.audioMixers.byId(2).name).to.equal('name2')
    })

    it('change name of audioMixer #2', function() {
        return snowmix.audioMixers.create({name: 'new-name-for-2', id: 2})
    })

    it('check name has stuck and we haven\'t created a new mixer', function() {
        expect(snowmix.audioMixers.all()).to.have.length(2)
        expect(snowmix.audioMixers.byId(2).name).to.equal('new-name-for-2')
    })

    it('should repopulate from snowmix', function() {
        return snowmix.populate()
    })

    it('Should have the same details after repopulating', function() {
        expect(snowmix.audioMixers.all()).to.have.length(2)
        expect(snowmix.audioMixers.byId(1).name).to.equal('name1')
        expect(snowmix.audioMixers.byId(2).name).to.equal('new-name-for-2')
    })

    it('Remove all created audioMixers', function() {
        return snowmix.audioMixers.deleteAll()
    })

    it('Should close the Snowmix connection', function() {
        return snowmix.close()
    })

    it('Should have not caused any warnings or errors', function() {
        expect(logger.count.error).to.equal(0)
        expect(logger.count.warn).to.equal(0)
    })
})
