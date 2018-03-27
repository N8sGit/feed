const Sequelize = require('sequelize')

console.log(process.env.DATABASE_URL, 'HELLO DATABASURL')
console.log(process.env, 'ENV')
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost:5432/blog', {
    logging: false
  }
)
module.exports = db
