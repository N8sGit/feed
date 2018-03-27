const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

router.use('/posts', require('./posts'))

router.use(function(req, res, next){
  console.log(req.path)

  next()
});
router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
