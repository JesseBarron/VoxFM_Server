const { app } = require('../index')


const poller = () => {
    let prevInfo = 'VoxFM'

    const startPoll = async () => {
        try{
            let currentSong = await app.service('streamInfo').find()
            if(currentSong !== prevInfo) {
                prevInfo = currentSong
                await app.service('streamInfo').update(null, { currentSong })
            }
        } catch(err) {
            console.log(err)
        }
    }
    setInterval(() => startPoll(), 10000)
}

module.exports = {
    poller
}