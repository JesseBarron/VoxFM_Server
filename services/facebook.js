const axios = require('axios')

const filterFeed = (obj) => {
    if(obj.source && obj.attachments.data[0].media) return obj
}

class FacebookFeed {
    constructor() {

    }
    async find() {
        try {
            const data = await axios.get(process.env.VOX_FB_FEED_URL)
            const feed = data.data.data.filter(filterFeed)
            const nextPage = data.data.paging.next
            return { feed, nextPage }
        } catch(err) {
            console.log(err)
        }
    }
    
    async fetchNextPage(url) {
        try{
            const data = await axios.get(url)
            const feed = data.data.data.filter(filterFeed)
            const nextPage = data.data.paging.next
            return { feed, nextPage }
        } catch(err) {
            console.log(err)
        }
    }
}

module.exports = {
    FacebookFeed,
}