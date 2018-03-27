const path = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const compression = require('compression')
const session = require('express-session')
const passport = require('passport')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const db = require('./db')
const sessionStore = new SequelizeStore({db})
const PORT = process.env.PORT || 8080
const app = express()
const socketio = require('socket.io')
const {Post, Category} = require('./db/models')

module.exports = app

/**
 * In your development environment, you can keep all of your
 * app's secret API keys in a file called `secrets.js`, in your project
 * root. This file is included in the .gitignore - it will NOT be tracked
 * or show up on Github. On your production server, you can add these
 * keys as environment variables, so that they can still be read by the
 * Node process on process.env
 */
if (process.env.NODE_ENV !== 'production') require('../secrets')

// passport registration
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) =>
  db.models.user.findById(id)
    .then(user => done(null, user))
    .catch(done))

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // compression middleware
  app.use(compression())

  // session middleware with passport
  app.use(session({
    secret: process.env.SESSION_SECRET || 'my best friend is Jon',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())

  // auth and api routes
  app.use('/auth', require('./auth'))
  app.use('/api', require('./api'))


  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))

  // any remaining requests with an extension (.js, .css, etc.) send 404
  .use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })
  app.use(function(req, res, next){
    console.log(req.path)
     next()
  });

  app.post('/post', function(req, res){
    Post.create(req.body)
    .then(function (created) {
        created.content = req.body.text
        created.title = req.body.title
      res.json({
        message: 'post created successfully',
        info: created
      });
      created.save()
    })
  })

  app.post('/categories', function(req, res){
    console.log('route entered')
    Category.create(req.body)
    .then(function(created){
      created.postId = req.body.postId
      created.category = req.body.category
      res.json({
        message: 'category association made',
        info: created
      });
      created.save()
    })
  })

app.put('/update/:postId', function(req, res){
  Post.findById(req.params.postId)
    .then(post => {
      post.content = req.body.content
      post.save()
      .then(res.json({post: post, message: 'post updated'})
      )
    })
    .catch(error => {
      console.log(error)
    })

})


app.get('/get', function(req, res){
  let postIds, categoryData, packet
  Post.findAll()
  .then(function(posts){
    postIds = posts.map((value) => {return value.id.toString()})
     categoryData = [];

    for (let i = 0; i < posts.length; i++){
      categoryData[i] = { id: posts[i].id, tags: []}
    }

     packet = {posts, postIds, categoryData}
    return packet
  })
    .then(function(result){
      return Category.findAll({where: { postId: packet.postIds}})
    })
     .then(function(cats){
          cats.map(function(value){
            let index = packet.categoryData.findIndex(i => i.id == value.postId);
            packet.categoryData[index].tags.push( '#' + value.category)
            })
        })
        .then(function(){
          let posts = packet.posts;
          categoryData = packet.categoryData
          res.json({message: 'here are all posts', info: posts, categories: categoryData })
        })
        .catch(error => console.error(error))
})

app.get('/getById/:id', function(req, res){
  let categories = []
  Category.findAll({where:{postId: req.params.id}})
    .then(function(result){
      result.forEach((value) => categories.push(value.category))
    })
      .then(function(){
        console.log(categories, 'categories in route ')
        res.json({message: 'categories sent', allCategories: categories})
      })
    
})
//REFACTOR THIS AT SOME POINT, IT DOESN'T UTILIZE PROMISE CHAINING
app.get('/getByCat/:category', function(req, res){
  Category.findAll({where: {category: req.params.category} })
  .then(function(association){
    let postData = [];
    association.map(function(item){
      postData.push(item.postId.toString())
    })
    Post.findAll({where: {id: postData}})
    .then(function(posts){
      let data = []
      for (let i = 0; i < posts.length; i++){
        data[i] = { id: posts[i].id, tags: []}
      }
    Category.findAll({where: {postId: postData}})
      .then(function(result){
        result.map(function(value){
        let index = data.findIndex(i => Number(i.id) === Number(value.postId));
        data[index].tags.push( '#' + value.category)
        })
      })
        .then(function(){
          res.json({message: 'these are all the posts associated with that category', info: posts, categories: data})
        })
          .catch(err => console.error(err))
      })
  })
})

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })
 // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))

  // set up our socket control center
  const io = socketio(server)
  require('./socket')(io)
}

const syncDb = () => db.sync({})

// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  sessionStore.sync()
    .then(syncDb)
    .then(createApp)
    .then(startListening)
} else {
  createApp()
}
