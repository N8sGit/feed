const Sequelize = require('sequelize')
const db = require('../db')

const Post = db.define('post', {
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },

    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.DATE
    },

    title: {
        type: Sequelize.STRING,
        defaultValue: ''
    }
})

module.exports = Post
