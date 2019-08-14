import express from 'express'
import axios from 'axios'
const router = express.Router()
const sqlite3 = require('sqlite3').verbose()

let db = new sqlite3.Database('../db/input.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if(err) return console.error(err)
})

const SET_DATABASE = (data) => {
    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXIST datas (id INTEGER PRIMARY KEY, data TEXT)', (err) => {
            if(err) return console.error(err)
        })
        db.run('INSERT INTO datas (data) VALUES (?)', data)
    })
    db.close()
}

router.get('/', (req, res) => {
    res.render('../public/test', { data: 'wtf' })
})

router.post('/postdata', (req, res) => {
    console.log('hello wllllll')
    SET_DATABASE(req.data)
    console.log('database save is success')
})

module.exports = router