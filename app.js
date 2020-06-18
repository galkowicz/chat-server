const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const mainRoutes = require('./routes/main')

const User = require('./models/user')
const Message = require('./models/message')

const sequelize = require('./util/database')

app.use(bodyParser.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.use(mainRoutes)

Message.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
User.hasMany(Message)
sequelize
  .sync()
  .then((result) => {
    console.log('starting....')
    app.listen(5000)
  })
  .catch((err) => {
    console.log('err: ', err)
  })
