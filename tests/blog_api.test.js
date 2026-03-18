const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const helper = require('../utils/test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../app')

const api = supertest(app)
let token

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  // crear usuario de prueba
  const user = new User({
    name: 'Tom',
    username: 'tom_123',
    passwordHash: 'secret' 
  })

  const savedUser = await user.save()

  const userToken = {
    username: savedUser.username,
    id: savedUser._id,
  }

  token = jwt.sign(userToken, process.env.SECRET)

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog({ ...blog, user: savedUser._id }))
  
  const promiseArray = blogObjects.map(blog => blog.save())
  const savedBlogs = await Promise.all(promiseArray)

  savedUser.blogs = savedUser.blogs.concat(savedBlogs.map(b => b._id))
  await savedUser.save()
})

describe('GET', () => {
  test('Blogs are returned as json', async () => {
    const response = await api.get('/api/blogs').expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

  test('Blogs contain their identification as an id property, not _id', async () => {
      const response = await api.get('/api/blogs')
      const blog = response.body[0] // primer elemento de la lista de blogs
      assert.equal("id" in blog, true)
      assert.equal("_id" in blog, false)
  })
})

describe('POST', () => {
  test('A blog is created correctly', async ()  => { 
    const newBlog = helper.dataBlog
    const response = await api.post('/api/blogs').set('authorization', `Bearer ${token}`).send(newBlog).expect(201).expect('Content-Type', /application\/json/)

    // comparar la información que se quería guardar con la información guardada 
    assert.equal(newBlog.title, response.body.title)
    assert.equal(newBlog.author, response.body.author)
    assert.equal(newBlog.url, response.body.url)
    assert.equal(newBlog.likes, response.body.likes)

    // verificar que la cantidad de blogs se haya incrementado en 1 
    const blogsAtEnd = await api.get('/api/blogs')
    assert.equal(blogsAtEnd.body.length, helper.initialBlogs.length + 1)
  })

  test('A blog without the likes property will have a default value of zero for that property', async () => { 
    const newBlogWithoutLikes = helper.dataBlogWithoutLikes
    const response = await api.post('/api/blogs').set('authorization', `Bearer ${token}`).send(newBlogWithoutLikes)
    assert.equal(response.body.likes, 0)
  })

  test('A blog without the title or URL property, or both, generates a 400 Bad Request status code.', async() => { 
    const invalidBlogs = helper.dataBlogsWithoutTitleURL
    const validBlog = helper.dataBlog

    for(const invalidBlog of invalidBlogs) { // se prueba un blog sin título, un blog sin URL, y un blog sin título ni URL
      await api.post('/api/blogs').set('authorization', `Bearer ${token}`).send(invalidBlog).expect(400)
    }

    await api.post('/api/blogs').set('authorization', `Bearer ${token}`).send(validBlog).expect(201)
  })

  test('Adding a blog fails with the appropriate status code 401 Unauthorized if a token is not provided', async() => { 
    const dataBlog = helper.dataBlog

    await api.post('/api/blogs').send(dataBlog).expect(401)
  })
})

describe('DELETE', () => { 
  test('A blog is successfully deleted', async () => { 
    const idDelete = '5a422a851b54a676234d17f7'
    await api.delete('/api/blogs/' + idDelete).set('authorization', `Bearer ${token}`).expect(204)

    const blogsAtEnd = await api.get('/api/blogs')
    assert.equal(blogsAtEnd.body.length, helper.initialBlogs.length - 1)

    const ids = blogsAtEnd.body.map(b => b.id)
    assert.equal(ids.includes(idDelete), false)
  })
})

describe('PUT', () => { 
  test('A blog is successfully updated', async () => { 
    const newData = helper.dataUpdated

    const idUpdate = '5a422a851b54a676234d17f7' // id que existe
    const response = await api.put('/api/blogs/' + idUpdate).send(newData).expect(200)
    assert.equal(newData.likes, response.body.likes)

    const idNotExists = '5a422a451b54a676234d15f7'// id que no existe
    await api.put('/api/blogs/' + idNotExists).send(newData).expect(404)

    const idInvalid = '25' // id que no es válido
    await api.put('/api/blogs' + idInvalid).send(newData).expect(404)
  })
})

after(async () => {
  await mongoose.connection.close()
})