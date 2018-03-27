require('./secrets')
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


class MyMessages {
    constructor() {
        this.messages = []
        this.currentId = 0
    }
    
    async find(params) {
        return this.messages
    }
    
    async get(id, params) {
        const message = this.messages.find(message => message.id === parseInt(id, 10))

        if (!message) throw new Error('This message does not exist')
        return message
    }
    
    async create(data, params) {
        const message = Object.assign({id: ++this.currentId}, data)
        this.messages.push(message)
        return message
    }

    async patch(id, data, params) {
        const message = await this.get(id)

        message = Object.assign(message, data)
    }

    async remove(id, params) {
        const message = await this.get(id)
        const index = this.messages.indexOf(message)
        this.messages.splice(index, 1)

        return message
    }
}


app.use(express.errorHandler())

const server = app.listen(PORT)

app.use('messages', new MyMessages)
app.use('feed', new FacebookFeed)
app.use('streamInfo', new VoxStreamInfo)


app.on('connection', connection => app.channel('everybody').join(connection))
app.publish(() => app.channel('everybody'))
server.on('listening', () => console.log('Server is listening in port 8080'))
app.service('messages').on('created', message => console.log(`New Message ${message.id}: ${message.text}`))
app.service('streamInfo').on('updated', currentSong => {
    console.log(`Song Changed to: ${currentSong}`)
    return currentSong
})



poller()

