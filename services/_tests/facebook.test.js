const assert = require('assert')
const expect = require('chai').expect
const app = require('../../index')

xdescribe(`Facebook feed Service`, async () => {
    let service,
    result

   before( async () => {
        service = app.service('feed')  
        result = await service.find({query: {url: undefined}})
   })

    it('registerd the service', () => {
        assert.ok(service, "Registered the service")
    })

    it('feed.find() returns an object', () => {
        expect(result).to.be.a('object')
    })

    it('Should have a feed prop with an array value', () => {
        expect(result.feed).to.be.a('array')
    })
    
    it('Should have a nextPage prop with a string value', () => {
        expect(result.nextPage).to.be.a('string')        
    })
})