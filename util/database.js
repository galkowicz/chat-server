const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.MYSQL_DEFAULT_DB, 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
})

module.exports = sequelize
