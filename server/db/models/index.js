const User = require('./user')
const Post = require('./post')
const Category = require('./category')
const Image = require('./image')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Category.hasMany(Post)
//Image.hasMany(Post)

module.exports = {
  User,
  Post,
  Category,
  Image
}
