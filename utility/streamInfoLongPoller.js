const app  = require('../index')


const poller = () => {
    let prevInfo = 'VoxFM'

    const startPoll = async () => {
        try{
            let { currentSong, artwork } = await app.service('streamInfo').find()        
            if(currentSong !== prevInfo) {
                prevInfo = currentSong
                await app.service('streamInfo').update(null, { currentSong, artwork })
            }
        } catch(err) {
            console.log(err)
        }
    }
    setInterval(() => startPoll(), 15000)
}

module.exports = poller