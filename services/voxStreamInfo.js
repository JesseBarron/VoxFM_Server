const axios = require('axios')
const htmlparser = require('htmlparser')
const Spotify = require('node-spotify-api')

const spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});

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
       this.streamInfo = {
           currentSong: 'VoxFM - Con Sello de Hecho en Mexico',
           artwork: null
        }
    }

    async getCurrentSong() {
        return this.streamInfo
    }

    async update(id, { currentSong, artwork }, params) {
        this.streamInfo = {currentSong, artwork}
        return this.streamInfo
    }

    async find() {
        try{
            const result = await axios.get(process.env.STREAM_INFO_URL)
            const parsedHTML = parser.parseComplete(result.data)
            const genre = handler.dom[1].children[1].children[3].children[5].children[1].children[0].children[0].data
            const currentSong = handler.dom[1].children[1].children[3].children[7].children[1].children[0].children[0].children[0].data
            const artwork = await this.getAlbumArt(currentSong.split(' - ')[0])
            this.streamInfo = {currentSong, artwork} 
            return this.streamInfo 
        } catch(err) {
            console.log(err)
            console.log("No Current Song Title")
            const currentSong = "VoxFM - Con Sello de Hecho en Mexico"
            return {
                currentSong,
                artwork: null
            }
        }
    }

    async getAlbumArt(artist) {
        try {
            const query = await spotify.search({type: 'artist', query: artist})
            const artistImage = query.artists.items[0].images[0].url || null
            return artistImage
        } catch(e) {
            return null
        }
    }
}

module.exports = {
    VoxStreamInfo
}