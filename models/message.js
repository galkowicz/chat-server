const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const User = sequelize.define('message', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  text: Sequelize.STRING,
})

module.exports = User
