const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user') // porque en mi esquema el campo se llama 'user'
    response.json(blogs)

  } catch(error) {
    next(error)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  
  try {
      const body = request.body

      if(!body.title || !body.url) return response.status(400).end()

      const userBlog = await User.findOne()

      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: userBlog._id
      })

      const savedBlog = await blog.save()

      userBlog.blogs = userBlog.blogs.concat(savedBlog._id)
      await userBlog.save()

      const showBlog = await savedBlog.populate('user')
      response.status(201).json(showBlog)

    } catch(error) {
      next(error)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()

  } catch(error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
      const body = request.body

    const newData = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newData, { new: true, context: 'query' })
    if(updatedBlog) response.json(updatedBlog)
    else response.status(404).end()

  } catch(error) {
    next(error)
  }
})

module.exports = blogsRouter
