const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const mainRoutes = require('./routes/main')

const User = require('./models/user')
const Message = require('./models/message')

const sequelize = require('./util/database')

const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', (socket) => {
  console.log('a user connected')
  const currentUserId = socket.handshake.query.userId

  socket.on('chat message', ({ text, userId, nickname }) => {
    User.findByPk(userId).then((user) => {
      user.createMessage({ text, userId, nickname }).then((message) => {
        io.emit('chat message', message)
      })
    })
  })

  socket.on('new user', () => {
    User.findAll().then((users) => {
      io.emit('user update', users)
    })
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
    console.log('destory id', currentUserId)
    User.destroy({ where: { id: currentUserId } }).then(() => {
      User.findAll().then((users) => {
        io.emit('user update', users)
      })
    })
  })
})

app.use(bodyParser.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

app.use(mainRoutes)

Message.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
User.hasMany(Message)
sequelize
  //   .sync() TODO change back to this
  .sync({ force: true })
  .then((result) => {
    console.log('starting....')
    server.listen(5000)
  })
  .catch((err) => {
    console.log('err: ', err)
  })
