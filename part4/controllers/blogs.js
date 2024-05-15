const Blog = require('../models/blog');
const blogsRouter = require('express').Router()

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (error) {
    response.status(500).json({ error: 'Something went wrong' })
  }
})

blogsRouter.post('/', async (request, response) => {
  try {
    const blog = new Blog(request.body)
    if (!blog.likes) {
      blog.likes = 0
    }
    if (!blog.title || !blog.url) {
      return response.status(400).json({ error: 'title or url missing' })
    }
    
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    response.status(500).json({ error: 'Something went wrong' })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    response.status(500).json({ error: 'Something went wrong' })
  }
})

module.exports = blogsRouter
