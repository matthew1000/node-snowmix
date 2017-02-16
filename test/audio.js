#!/usr/bin/env node
'use strict'
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new()

describe('Audio feeds/mixers/sinks', function() {
    it('Connect to Snowmix which should load all initial audioFeeds', function() {
        return snowmix.connect()
    })

    it('Remove any audio feeds/mixers/sinks lying around', function() {
        return Promise.all([
            snowmix.audioFeeds.deleteAll(),
            snowmix.audioMixers.deleteAll(),
            snowmix.audioSinks.deleteAll(),
        ])
    })

    it('Create 2 new feeds feed, 1 mixer, and 1 sink', function() {
        return Promise.all([
            snowmix.audioFeeds.add(),
            snowmix.audioFeeds.add(),
            snowmix.audioMixers.add(),
            snowmix.audioSinks.add(),
        ])
    })

    it('Add the two audioFeeds to the mixer', function() {
        return Promise.all([
            snowmix.audioMixers.byId(1).addAudioFeed(1),
            snowmix.audioMixers.byId(1).addAudioFeed(2),
        ])
    })

    it('Unmute the two audioFeeds to the mixer', function() {
        return Promise.all([
            snowmix.audioMixers.byId(1).unmuteAudioFeed(1),
            snowmix.audioMixers.byId(1).unmuteAudioFeed(2),
        ])
    })

    it('Start the mixer', function() {
        return snowmix.audioMixers.byId(1).start()
    })

    it('Add the mixer to the sink', function() {
        return snowmix.audioSinks.byId(1).addAudioMixer(1)
    })

    it('Remove all created audio feeds/mixers/sinks', function() {
        return Promise.all([
            snowmix.audioFeeds.deleteAll(),
            snowmix.audioMixers.deleteAll(),
            snowmix.audioSinks.deleteAll(),
        ])
    })

    it('Should close the Snowmix connection', function() {
        return snowmix.close()
    })
})
