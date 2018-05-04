if(process.env.TEST || process.env.DEV) require('../../secrets/secrets')
const assert = require('assert')
const expect = require('chai').expect
const { transporter } = require('../email')
app = require('../../index')

xdescribe("Email Service", () => {
    let service, result

    before(async () => {
        service = app.service('email')
        result = await service.create({Message: 'hello'})
    })
    it('Transporter should be varified', async () => {
        try {
            const varified = await transporter.verify()
            console.log('Varified', varified)
            expect(varified).to.be.true
        } catch(e) {
            console.log(e)
            expect.fail(false, true, "Expected transporter.varify() to return true")
        }
    })
    it('Should be registered', () => {
        assert.ok(service, "email service is registered")
    })
})