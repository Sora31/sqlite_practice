import express from 'express'
const router = express.Router()
const sqlite3 = require('sqlite3').verbose()

router.get('/', (req, res) => {
    console.log('hello wllllll')
    let db = new sqlite3.Database(`${__dirname}/../db/input.db`, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
        if(err) return console.error('open db fail', err)
    })
    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS datas (id INTEGER PRIMARY KEY, data TEXT)', (err) => {
            if(err) return console.error('create table fail', err)
        })
        db.all('SELECT * FROM datas', [], (err, rows) => {
            if(err){
                throw err
            }
            res.render('../public/test', { data: rows })
        })
    })
    db.close(err => {
        if(err) return console.error('close db fail', err)
    })
})

router.post('/postdata', (req, res) => {
    console.log('hello post', req.body)
    let db = new sqlite3.Database(`${__dirname}/../db/input.db`, sqlite3.OPEN_READWRITE, err => {
        if(err) return console.error('DB is not found, please retry', err)
    })
    db.serialize(() => {
        db.run('INSERT INTO datas (data) VALUES (?)', req.body.data)
        res.send()
    })
    db.close(err => {
        if(err) return console.error('close db fail', err)
    })
})

router.delete('/deletedata', (req, res) => {
    console.log('hello delete', req.body)
    let db = new sqlite3.Database(`${__dirname}/../db/input.db`, sqlite3.OPEN_READWRITE, err => {
        if(err) return console.error('DB is not found, please retry', err)
    })
    db.serialize(() => {
        db.run('DELETE FROM datas WHERE id=?', Number(req.body.data))
        res.send()
    })
    db.close(err => {
        if(err) return console.error('close db fail', err)
    })
})

module.exports = router
