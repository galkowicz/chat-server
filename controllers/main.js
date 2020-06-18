const User = require('../models/user')
const Message = require('../models/message')

exports.postLogin = (req, res, next) => {
  const { nickname } = req.body
  const response = {}

  if (!nickname) next()
  User.create({ nickname: nickname })
    .then((user) => {
      response.userId = user.dataValues.id
      response.nickname = user.dataValues.nickname
      User.findAll()
        .then((users) => {
          response.connectedUsers = users
        })
        .then(() => {
          Message.findAll()
            .then((messages) => {
              response.messages = messages.slice(
                Math.max(messages.length - 10, 0)
              )
            })
            .then(() => {
              res.status(201).send(response)
            })
        })
    })
    .catch((err) => {
      console.log(err)
    })
}
