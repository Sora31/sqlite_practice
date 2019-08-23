import express from 'express'
import bodyParser from 'body-parser'
import testRouter from './routes/test'
import listRouter from './routes/todolist'

const app = express()

app.use(require('cors')())

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static('public'))

app.use('/', testRouter)
app.use('/todolist', listRouter)

const server = app.listen(2019, () => {
    console.log(`express running ${server.address().port} PORT`)
})