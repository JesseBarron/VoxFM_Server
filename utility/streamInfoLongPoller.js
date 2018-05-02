const app  = require('../index')


const poller = () => {
    let history = [];

    let currentInfo = {
        currentSong: 'VoxFM - Con Sello de Hecho en Mexico',
        artwork: null
    }
    let timeOut = null
    const startPoll = async () => {
        try{
            let { currentSong, artwork } = await app.service('streamInfo').find()        
            if(currentSong !== currentInfo.currentSong && !history.includes(currentSong)) {
               if(currentSong != 'VoxFM') history.push(currentSong)
                currentInfo = {currentSong, artwork}
                if(history.length > 10) {
                    history.shift()
                }
                await app.service('streamInfo').update(null, {currentSong, artwork})
                if(timeOut !== null) {
                    clearTimeout(timeOut)
                }
                timeOut = setTimeout( () => {
                    const defaultInfo = {
                        currentSong: 'VoxFM - Con Sello de Hecho en Mexico',
                        artwork: null
                    }
                    currentInfo = defaultInfo
                    app.service('streamInfo').update(null, defaultInfo)
                }, 330000)
            }
        } catch(err) {
            console.log(err)
        }
    }
    setInterval(() => startPoll(), 15000)
}

module.exports = poller
