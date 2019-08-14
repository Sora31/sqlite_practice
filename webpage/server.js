import express from 'express'
import testRouter from './routes/test'
const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use('/', testRouter)

const server = app.listen(2019, () => {
    console.log(`express running ${server.address().port} PORT`)
})