const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const helper = require('../utils/user_test_helper')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const userObjects = helper.initialUsers
    .map(user => new User(user))
  const promiseArray = userObjects.map(user => user.save())
  await Promise.all(promiseArray)
})

describe('POST', () => {
    test('An invalid user is not created.', async ()  => { 
        let response 
        response = await api.post('/api/users').send(helper.invalidUsers[0]).expect(400)
        assert(response.body.error.includes('Username is required.'))

        response = await api.post('/api/users').send(helper.invalidUsers[1]).expect(400)
        assert(response.body.error.includes('The username must contain at least 3 characters.'))

        response = await api.post('/api/users').send(helper.invalidUsers[2]).expect(400)
        assert(response.body.error.includes('Password is required.'))

        response = await api.post('/api/users').send(helper.invalidUsers[3]).expect(400)
        assert(response.body.error.includes('The password must contain at least 3 characters.'))

        const finalUsers = await api.get('/api/users')
        assert.strictEqual(finalUsers.body.length, helper.initialUsers.length)
    })
})

after(async () => {
  await mongoose.connection.close()
})