const Blog = require('../models/blog');
const blogsRouter = require('express').Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if (!blog.likes) {
    blog.likes = 0
  }
  
  const savedBlog = await blog
    .save()
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter
