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
const {Post, Category, Image} = require('./db/models')
const Uploader = require('s3-image-uploader');
const Twit = require('twit');
module.exports = app
/**
 * In your development environment, you can keep all of your
 * app's secret API keys in a file called `secrets.js`, in your project
 * root. This file is included in the .gitignore - it will NOT be tracked
 * or show up on Github. On your production server, you can add these
 * keys as environment variables, so that they can still be read by the
 * Node process on process.env
 */
let secrets;
if (process.env.NODE_ENV !== 'production') {
  secrets = require('../secrets')
}
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
  app.use((req, res, next) => {
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

  const authConfig = {
    consumer_key: 'Q1c1Ec64P0j5Ydg9TOwJjgoyy',
    consumer_secret: 'REUqPXb163c0HSaThu6361T6MoAw5l7EJ3uoSFK2icAux36UOJ',
    access_token: '2948033138-n7jyijhlhSTBT6aHRCg5nIuDD9X6v4yfA8o59pJ',
    access_token_secret: '20KnIgl5escTQQq7EkHAnqKROtRLIlGprz1j1u5je9dz3',
    timeout_ms: 60 * 1000
  };
  //'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=justinbieber&count=5
  const Twitter = new Twit(authConfig);


  app.post('/twitter', function(req, response){
    let screenName = req.body.query
    let count = req.body.number
     Twitter.get(`https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${screenName}&count=${count}`, (req, res) => {
    const data = Array.from(res);
    const result = data.map((value) => ( value.id_str));
    response.json(result)
    })
  })

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
