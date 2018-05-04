const expect = require('chai').expect
const assert = require('assert')
const app = require('../../index')

describe('voxStreamInfo Service', () => {
    let service,
    result

    before(async () => {
        service = app.service('streamInfo')
        result = await service.find()
    })

    it('voxStreamInfo is registered', () => {
        assert.ok(service, 'voxStreamInfo is Regisered')
    })

    it('voxStreamInfo.find() Should return a string', () => {
        expect(result.currentSong).to.be.a('string')
    })

    it(`voxStreamInfo.update() should update the class's newSong property`, async () => {
        let newSong = 'New String'
        let propSong = await service.update(null, { currentSong: newSong })
        expect(propSong.currentSong).to.equal(newSong)
    })

    it('voxStreamInfo.getCurrentSong() should return the current song', async () => {
        let currentSong = service.streamInfo.currentSong
        let getSong = await service.getCurrentSong()
        expect(getSong.currentSong).to.equal(currentSong)
    })
})