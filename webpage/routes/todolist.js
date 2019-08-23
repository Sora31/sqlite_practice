import express from 'express'
const sqlite3 = require('sqlite3').verbose()

const router = express.Router()

const listDB = `${__dirname}/../../db/list.db`

router.get('/', (req, res) => {
    let db = new sqlite3.Database(listDB, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
        if(err) return console.error('open todolist db fail from get router', err)
    })
    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS todolist (id INTEGER PRIMARY KEY, text TEXT, checked BOOLEAN, color TEXT)', err => {
            if(err) return console.error('create todolist table fail', err)
        })
        db.all('SELECT * FROM todolist', [], (err, rows) => {
            if(err) throw err
            res.send(rows)
        })
    })
    db.close(err => {
        if(err) return console.error('close db fail from get router', err)
    })
})

router.post('/', (req, res) => {
    let db = new sqlite3.Database(listDB, sqlite3.OPEN_READWRITE, err => {
        if(err) return console.error('open todolist db fail from post router', err)
    })
    db.serialize(() => {
        db.run('INSERT INTO todolist (text, checked, color) VALUES (?, ?, ?)', req.body.data)
        res.send()
    })
    db.close(err => {
        if(err) return console.error('close db fail from post router', err)
    })
})






module.exports = router
