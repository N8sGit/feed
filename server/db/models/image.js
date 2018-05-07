const Sequelize = require('sequelize')
const db = require('../db')

const Image = db.define('image', {
    imageId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bucket: {
        type: Sequelize.STRING,
        defaultValue: 'nathan-anecone'
    },
    source: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    name: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    caption: {
        type: Sequelize.STRING,
        defaultValue: ''
    }

})

module.exports = Image

