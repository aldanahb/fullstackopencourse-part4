const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (publications) => {
    return publications.reduce((total, p) => total + p.likes, 0)
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0) return null

    let favorite = blogs[0]
    for(const blog of blogs) {
        if(blog.likes > favorite.likes) {
            favorite = blog
        }
    }

    const result = {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }

    return result
}

const mostBlogs = (blogs) => {
    if(blogs.length === 0) return null

    const blogsByAuthor = lodash.countBy(blogs, 'author') // devuelve por ejemplo {"Martin": 5, "Lisa": 9}
    let maxBlogs = 0
    let authorWithTheMostBlogs
    for(const key in blogsByAuthor) {
        if(blogsByAuthor[key] > maxBlogs) {
            maxBlogs = blogsByAuthor[key]
            authorWithTheMostBlogs = key
        }
    }
    return {author: authorWithTheMostBlogs, blogs: maxBlogs}
}

const mostLikes = (blogs) => {
    if(blogs.length === 0) return null

    const blogsByAuthor = lodash.groupBy(blogs, 'author') // devuelve por ejemplo {"Martin": [{...}, {...}, {...}], "Lisa": [{...}, {...}]}
    let maxLikes = 0
    let authorWithTheMostLikes 
    for(const key in blogsByAuthor) {
        let sum = 0
        for(const blog of blogsByAuthor[key]) {
            sum += blog.likes
        }
        if(sum > maxLikes) {
            maxLikes = sum
            authorWithTheMostLikes = key
        }
    }

    return {author: authorWithTheMostLikes, likes: maxLikes}
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
