const axios = require('axios')

class FacebookFeed {
    constructor() {

    }
    async find() {
        try {
            const data = await axios.get(process.env.VOX_FB_FEED_URL)
            const feed = data.data.data.filter(obj => {
                if(obj.source && obj.attachments.data[0].media) return obj
            })
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