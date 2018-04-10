const admin = require('firebase-admin')
const Storage = require('@google-cloud/storage')

const serviceAccount = process.env.FIREBASE_ADMIN_SECRET || require('../../secrets/Vox94Secret.json')

const config = {
    projectId: 'vox94-1474e',
}

storage = new Storage({
    projectId: config.projectId
})
storage.bucket('gs://vox94-1474e.appspot.com')
    .getFiles()
    .then(res => console.log(res))
    .catch(err => console.log(err))
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://vox94-1474e.firebaseio.com",
    storageBucket: "gs://vox94-1474e.appspot.com/",
    projectId: "vox94-1474e"
})

const db = admin.database()
const voxfm = db.ref('/lmp/')

function getVal () {
    let res = ''
    voxfm.on('value', (snapshot) => {
        // console.log(snapshot.val())
        // return snapshot.val()
        res = snapshot.val()
    })
    return res
}

console.log(getVal())