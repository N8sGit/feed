const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category_entries', {
    postId: {
        type: Sequelize.UUID,
        allowNull: false
    },

    category: {
        type: Sequelize.STRING
    }

})

module.exports = Category
