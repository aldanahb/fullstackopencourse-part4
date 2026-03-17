const mongoose = require('mongoose')
const config = require('../utils/config')

mongoose.set('strictQuery', false)

const userSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    required: [true, 'Username is required.'],
    minlength: [3, 'The username must contain at least 3 characters.'],
    unique: true
  },
  passwordHash: String,
  blogs: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' } ]
})

const User = mongoose.model('User', userSchema)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => { 
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  }
})

module.exports = User