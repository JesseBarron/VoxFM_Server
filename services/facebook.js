const axios = require('axios')

const filterFeed = (obj) => {
    if(obj.source && obj.attachments.data[0].media) return obj
}

class FacebookFeed {
    constructor() {

    }
    async find(params) {
        try {
            const url = params.query.url
            const data = await axios.get(url || process.env.VOX_FB_FEED_URL)
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