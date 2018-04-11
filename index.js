require('./secrets/secrets')
const feathers = require('@feathersjs/feathers')
const express = require('@feathersjs/express')
const socketio = require('@feathersjs/socketio')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express(feathers())
const { FacebookFeed, VoxStreamInfo } = require('./services')
module.exports = {
    app
}
const { poller } = require('./utility')
const PORT = process.env.PORT || 8080

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.configure(express.rest())
app.configure(socketio())
app.use(bodyParser.json())


app.use(express.errorHandler())

const server = app.listen(PORT)

app.use('feed', new FacebookFeed)
app.use('streamInfo', new VoxStreamInfo)


app.on('connection', connection => app.channel('everybody').join(connection))
app.publish(() => app.channel('everybody'))
server.on('listening', () => console.log(`Server is listening in port ${PORT}`))
app.service('streamInfo').on('updated', currentSong => {
    console.log(`Song Changed to: ${currentSong}`)
    return currentSong
})

poller()

