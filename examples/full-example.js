#!/usr/bin/env node
'use strict'
/**
 * A full example.
 * Creates two AV feeds, and switches between them every three seconds.
 */
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    id = process.argv[2],
    name = process.argv[3]

snowmix.connect()
.then(() => {
    return Promise.all([
        snowmix.vfeeds.removeAll(),
        snowmix.audioFeeds.removeAll(),
        snowmix.audioMixers.removeAll(),
        snowmix.audioSinks.removeAll(),
    ])
}).then(() => {
    return Promise.all([
        snowmix.texts.add({id: 1, string: 'This is feed 1'}),
        snowmix.texts.add({id: 2, string: 'This is feed 2'}),
        snowmix.feeds.add({id: 1}),
        snowmix.feeds.add({id: 2}),
        snowmix.audioFeeds.add({id: 1}),
        snowmix.audioFeeds.add({id: 2}),
        snowmix.audioMixers.add({id: 1}),
        snowmix.audioSinks.add({id: 1}),
    ])
}).then(() => {
    return Promise.all([
        snowmix.audioMixers.byId(1).addAudioFeed(1),
        snowmix.audioMixers.byId(1).addAudioFeed(2),
    ])
}).then(() => {
    return Promise.all([
        snowmix.audioMixers.byId(1).unmuteAudioFeed(1),
        snowmix.audioMixers.byId(1).unmuteAudioFeed(2),
    ])
}).then(() => {
    return snowmix.audioMixers.byId(1).start()
}).then(() => {
    return snowmix.audioSinks.byId(1).addAudioMixer(1)
}).then(() => {
    console.log('Setup complete')
    let currentFeed = 1
    switchToFeed(currentFeed)
    setInterval(() => {
        currentFeed = currentFeed === 1 ? 2 : 1
        console.log('...')
        switchToFeed(currentFeed)
    }, 3000)
}).error(e => {
    console.warn(e)
    return snowmix.close()
})

function switchToFeed(n) {
    Promise.all([
        snowmix.feeds.byId(n).switch(),
        snowmix.audioMixers.byId(1).switchToAudioFeeds([n]),
        snowmix.texts.byId(n).show(),
        snowmix.texts.byId(n == 1 ? 2 : 1).hide()
    ]).then(() => {
        console.log('Successfully switched to feed', n)
    })

}
