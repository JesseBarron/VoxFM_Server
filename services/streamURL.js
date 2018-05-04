

class StreamURL {
    constructor(){}
    async find() {
        return process.env.STREAM_URL
    }
}

module.exports = {
    StreamURL
}