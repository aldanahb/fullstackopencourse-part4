const bcryptjs = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  if(!password) return response.status(400).json({error: 'Password is required.'})
  else if(password.length < 3) return response.status(400).json({error: 'The password must contain at least 3 characters.'})

  try {
    const saltRounds = 10
    const passwordHash = await bcryptjs.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)

  } catch(error) { 
    next(error) 
  }
})

usersRouter.get('/', async (request, response) => {
  try {
      const users = await User.find({}).populate('blogs')
      response.json(users)

  } catch(error) {
      next(error)
  }
})

module.exports = usersRouter