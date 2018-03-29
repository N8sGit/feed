const router = require('express').Router()
const {Post} = require('../db/models')
module.exports = router


router.all('/', function(req,res){
})

router.get('/get', function(req, res){
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

router.post('/post', function(req, res){
    Post.create(req.body)
    .then(function (created) {
        created.content = created.text
      res.json({
        message: 'post created successfully',
        info: created
      });
      created.save()
    })
  })
