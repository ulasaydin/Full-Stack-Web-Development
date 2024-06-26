const Blog = require('../models/blog');
const blogsRouter = require('express').Router()
const {userExtractor} = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
  } catch (error) {
    response.status(500).json({ error: 'Something went wrong' })
  }
})

blogsRouter.post('/',userExtractor , async (request, response, next) => {
  try {
    const user =  request.user
    const body = request.body
    if(body.title === undefined || body.url === undefined) {
      return response.status(400).json({ error: 'Title or URL is missing' })
    } else {
      const blog = new Blog( {
        url: body.url,
        title: body.title,
        author: body.author === undefined ? '' : body.author,
        user: user._id,
        likes: body.likes === undefined ? 0 : body.likes,
      })
  
      const savedBlog = await blog.save()
  
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.status(201).json(savedBlog)
    }
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    const user = request.user

    if (blog.user.toString() !== user._id.toString()) {
      return response.status(401).json({ error: 'Unauthorized' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  try {
    const blog = request.body
    const updatedBlog
      = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
})

module.exports = blogsRouter
