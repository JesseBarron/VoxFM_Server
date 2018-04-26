const app  = require('../index')


const poller = () => {
    let prevInfo = {
        currentSong: 'VoxFM',
        artwork: null
    }
    let timeOut = null
    const startPoll = async () => {
        try{
            let { currentSong, artwork } = await app.service('streamInfo').find()        
            if(currentSong !== prevInfo.currentSong) {
                prevInfo = {currentSong, artwork}
                await app.service('streamInfo').update(null, {currentSong, artwork})
                if(timeOut !== null) {
                    clearTimeout(timeOut)
                }
                timeOut = setTimeout(async () => {
                    const defaultInfo = {
                        currentSong: 'VoxFM',
                        artwork: null
                    }
                    prevInfo = defaultInfo
                    await app.service('streamInfo').update(null, defaultInfo)
                }, 330000)
            }
        } catch(err) {
            console.log(err)
        }
    }
    setInterval(() => startPoll(), 15000)
}

module.exports = poller

//390000