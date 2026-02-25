const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)

  } catch(error) {
    next(error)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  
  try {
      const body = request.body

    if(!body.title || !body.url) return response.status(400).end()

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0
    })
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)

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
