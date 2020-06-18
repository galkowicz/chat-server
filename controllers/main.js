const User = require('../models/user')

exports.postLogin = (req, res, next) => {
  console.log('req-body: ', req.body)
  const { nickname } = req.body

  if (!nickname) next()
  User.create({ nickname: nickname })
    .then((user) => {
      console.log('user created')
    })
    .catch((err) => {
      console.log(err)
    })
  res.status(201).send({
    messages: [{ id: '123', nickname: 'yossi', text: 'test message' }],
  })
}
