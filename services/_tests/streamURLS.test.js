if(process.env.TEST || process.env.DEV) require('../../secrets/secrets')
const assert = require('assert')
const expect = require('chai').expect
app = require('../../index')


xdescribe('StreamURL Service', () => {
    let service, result;

    before(async () => {
        service = app.service('streamURL')
        result = await service.find()
    })

    it('StreamURL Service should be registered', () => {
        assert.ok(service, "StreamURL registered")
    })
    it('StreamURL.find() should return the streaming url', () => {
        expect(typeof result).to.equal('string')
    })
})