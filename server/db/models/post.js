const Sequelize = require('sequelize')
const db = require('../db')

const Post = db.define('post', {
    content: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },

    date: {
        type: Sequelize.DATE,
    },

    title: {
        type: Sequelize.STRING,
        defaultValue: ''
    }
})

module.exports = Post
