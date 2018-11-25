const session = require('express-session')
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser= require('body-parser')
const app = express()
const port = 3000

const db = require('./models')
const User = db.User
const Task = db.Task

const passport = require('./config/passport')

app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())

app.listen(port, () => {
  db.sequelize.sync()
  console.log(`Example app listening on port ${port}!`)
})

require('./routes')(app, passport)