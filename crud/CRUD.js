const sqlite3 = require('sqlite3').verbose()

let dbdatas = [{x : 2, y : 'banana'}, {x : 3, y : 'apple'}, {x: 4, y: 'grape'}, {x: 5, y: 'starfruit'}]

let db = new sqlite3.Database('./db/test4.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if(err){
        return console.error(err.message)
    }
    console.log('Connect sqlite database is successfully')
})

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS playlists (id INT, Name TEXT)', err => {
        if(err) dbErr(err)
        console.log('create table successfully')
    })
    db.run('INSERT INTO playlists(id, name) VALUES(?,?)', [1, 'pineapple'], err => {
        if(err) dbErr(err)
        console.log('insert data successfully')
    })
    db.each('SELECT id as PlaylistID, Name as Name FROM playlists', (err, row) => {
        if(err) dbErr(err)
        console.log(row.PlaylistID + '\t' + row.Name)
    })
    dbdatas.map(dbdata => {
        db.run('INSERT INTO playlists(id, name) VALUES(?, ?)', [dbdata.x, dbdata.y], err => {
            if(err) dbErr(err)
            console.log('data insert successfully')
        })
    })
    db.each('SELECT id as PlaylistID, Name as Name FROM playlists', (err, row) => {
        if(err) dbErr(err)
        console.log(row.PlaylistID + '\t' + row.Name)
    })
    db.run('DELETE FROM playlists WHERE id=(?)', 5, err => {
        if(err) dbErr(err)
        console.log('delete row successfully')
    })
    db.each('SELECT id as PlaylistID, Name as Name FROM playlists', (err, row) => {
        if(err) dbErr(err)
        console.log(row.PlaylistID + '\t' + row.Name)
    })
})

db.close(err => {
    if(err) dbErr(err)
    console.log('Close sqlite database is successfully')
})


dbErr = (err) => {
    return console.error(err.message)
}