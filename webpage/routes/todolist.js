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
    console.log('dra', req.body)
    const data = {
        text: req.body.text,
        checked: req.body.checked,
        color: req.body.color,
    }
    let db = new sqlite3.Database(listDB, sqlite3.OPEN_READWRITE, err => {
        if(err) return console.error('open todolist db fail from post router', err)
    })
    db.serialize(() => {
        db.run('INSERT INTO todolist (text, checked, color) VALUES (?, ?, ?)', data.text, false, data.color)
        db.all('SELECT * FROM todolist', [], (err, rows) => {
            if(err) throw err
            res.send(rows)
        })
    })
    db.close(err => {
        if(err) return console.error('close db fail from post router', err)
    })
})

router.delete('/', (req, res) => {
    console.log('ddd', req.body)
    let db = new sqlite3.Database(listDB, sqlite3.OPEN_READWRITE, err => {
        if(err) return console.error('open todolist db fail from delete router', err)
    })
    db.serialize(() => {
        db.run('DELETE FROM todolist WHERE id=?', req.body.id)
        db.all('SELECT * FROM todolist', [], (err, rows) => {
            if(err) throw err
            res.send(rows)
        })
    })
    db.close(err => {
        if(err) return console.error('close db fail from delete router', err)
    })
})

router.put('/', (req, res) => {
    console.log('drrr', req.body)
    let db = new sqlite3.Database(listDB, sqlite3.OPEN_READWRITE, err => {
        if(err) return console.error('open todolist db fail from update router', err)
    })
    db.serialize(() => {
        db.run('UPDATE todolist SET checked=? WHERE id=?', req.body.checked, req.body.id)
        db.all('SELECT * FROM todolist', [], (err, rows) => {
            if(err) throw err
            res.send(rows)
        })
    })
    db.close(err => {
        if(err) return console.error('close db fail from update router', err)
    })
})





module.exports = router
