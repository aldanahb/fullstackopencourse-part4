const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/loggers')
const blogsRouter = require('./controllers/blogs')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(config.MONGODB_URI)
.then(() => logger.info('connected to MongoDB'))
.catch(error => logger.error('error connecting to MongoDB: ' + error.message))

app.use('/api/blogs', blogsRouter)

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})