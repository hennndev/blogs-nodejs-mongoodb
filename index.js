const express = require('express')
const mongoose = require('mongoose')
const appRoute = require('./routes/appRoute')
const dashboardRoute = require('./routes/dashboardRoute')
const authRoute = require('./routes/authRoute')
const cookieParser = require('cookie-parser')
const { currentUser } = require('./middleware/authMiddleware')
require('dotenv').config({path: './config/config.env'})

const app = express()

mongoose.connect(process.env.MONGOODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen( process.env.PORT || 5000, () => console.log('Connected to server'))
}).catch(() => console.log('Failed connect to database'))

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(cookieParser())
app.get('*', currentUser)
app.use(dashboardRoute)
app.use(appRoute)
app.use(authRoute)
app.get('*', (req, res) => res.render('404', { title: 'Page Not Found'}))