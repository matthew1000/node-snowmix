'use strict'
let Snowmix = require('../node-snowmix'),
    snowmix = Snowmix.new(),
    expect = require('chai').expect

it('Should get the version', function() {
    return snowmix.connect()
    .then(() => {
        let v = snowmix.systemInfo.snowmixVersion
        console.log('This is Snowmix version', v)
        expect(v).to.equal('0.5.1');
    })
})

it('Should close the Snowmix connection', function() {
    return snowmix.close()
})
