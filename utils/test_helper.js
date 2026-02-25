const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  }
]

const dataBlog = {
  title: "First class objects",
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2014/11/24/FirstClassObjects.html",
  likes: 10
}

const dataBlogWithoutLikes = {
  title: "First class objects",
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2014/11/24/FirstClassObjects.html"
}

const dataBlogsWithoutTitleURL = [
  {
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2014/11/24/FirstClassObjects.html",
    likes: 10
  },
  {
    title: "First class objects",
    author: "Robert C. Martin",
    likes: 10
  },
  {
    author: "Robert C. Martin",
    likes: 10
  }
]

const dataUpdated = {
  likes: 20
}

module.exports = { initialBlogs, dataBlog, dataBlogWithoutLikes, dataBlogsWithoutTitleURL, dataUpdated }