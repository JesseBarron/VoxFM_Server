const axios = require('axios')
const htmlparser = require('htmlparser')
const handler = new htmlparser.DefaultHandler(function (err, dom) {
    if (err) {
        console.log(err)
        return err
    } else {
        return dom
    }
})
const parser = new htmlparser.Parser(handler)

class VoxStreamInfo {
    constructor() {
       this.newSong = 'VoxFM'
    }

    async getCurrentSong() {
        return this.newSong
    }

    async update(id, { currentSong }, params) {
        this.currentSong = currentSong
        return this.newSong
    }

    async find() {
        try{
            const result = await axios.get('http://www.indahosting.net:8128/index.html?sid=1')
            const parsedHTML = parser.parseComplete(result.data)
            const genre = handler.dom[1].children[1].children[3].children[5].children[1].children[0].children[0].data
            const currentSong = handler.dom[1].children[1].children[3].children[7].children[1].children[0].children[0].children[0].data
            this.newSong = currentSong 
            return this.newSong
        } catch(err) {
            console.log(err)
            const genre = "VoxFM"
            const currentSong = "VoxFM"
            return this.newSong = currentSong 
        }
    }
}

module.exports = {
    VoxStreamInfo
}