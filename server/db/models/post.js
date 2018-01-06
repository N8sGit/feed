const Sequelize = require('sequelize')
const db = require('../db')

const Post = db.define('post', {
    content: {
        type: Sequelize.TEXT
    },

    date: {
        type: Sequelize.DATE
    },

    category: {
        type: Sequelize.STRING
    }
})

module.exports = Post