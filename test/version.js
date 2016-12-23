'use strict'
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    expect = require('chai').expect

it('Should get the version', function() {
    return snowmix.general.systemInfoSingle('snowmixVersion')
    .then(v => {
        console.log('This is Snowmix version', v)
        expect(v).to.equal('0.5.1');
    })
})

it('Should close the Snowmix connection', function() {
    return snowmix.close()
})
