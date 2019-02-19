const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const mongo = process.env.MONGODB || 'mongodb://localhost/personal-controller'
const pages = require('./routes/pages')
const series = require('./routes/series')

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

//Para receber o POST
app.use(bodyParser.urlencoded({ extended: true }))

//Onde ficarão os assets
app.use(express.static('public'))

//view engine - EJS
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//rotas
app.use('/', pages)
app.use('/series', series)

//conexão com mongodb
mongoose
    .connect(mongo, { useNewUrlParser: true })
    .then(() => {
        app.listen(port, () => {
            console.log('listening on:' +port)
        })              
    })
    .catch( e => {
        console.log(e)
})
