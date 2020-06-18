const Sequelize = require('sequelize')

const sequelize = new Sequelize('any-clip', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
})

module.exports = sequelize
