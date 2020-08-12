const Sequelize = require('sequelize')

const sequelize = new Sequelize('node-complete', 'root', 'Wami5456', {
  dialect: 'mysql',
  host: 'localhost'
})

module.exports = sequelize