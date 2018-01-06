const router = require('express').Router()
const {Post} = require('../db/models')
module.exports = router

router.get('/', function(req, res){
    let result = Post.findAll()
    result
    .then(function(content){
        res.json({
            message: 'These are all the posts',
            info: content
        })
    })
    .catch(error => console.error(error))
})

