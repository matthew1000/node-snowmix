'use strict'
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    expect = require('chai').expect

it('Should get the x,y system geometry', function() {
    return snowmix.general.systemGeometry()
    .then(geometry => {
        console.log(`The system geometry width is ${geometry.width} and height is ${geometry.height}`)
        expect(geometry.width).to.equal(1024)
        expect(geometry.height).to.equal(576)
    })
})


it('Should close the Snowmix connection', function() {
    return snowmix.close()
})
