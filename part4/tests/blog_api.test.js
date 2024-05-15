const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body

  blogs.forEach(blog => {
    expect(blog._id).toBeDefined()
  })
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(titles).toContain('Canonical string reduction')
})

test('likes property defaults to 0', async () => {
  const newBlog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  }
  
  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)
})

test('blos without url or title are not added', async () => {
  const newBlogNoTitle = {
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12
  }

  const newBlogNoUrl = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    likes: 12
  }

  await api
    .post('/api/blogs')
    .send(newBlogNoTitle)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(newBlogNoUrl)
    .expect(400)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)

}) 

test('a blog can be deleted', async () => {
  let response = await api.get('/api/blogs')
  const blogToDelete = response.body[0]
  console.log(blogToDelete)
  await api
    .delete(`/api/blogs/${blogToDelete._id}`)
    .expect(204)

  response = await api.get('/api/blogs')
  const blogsAtEnd = response.body
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  const titles = blogsAtEnd.map(r => r.title)
  expect(titles).not.toContain(blogToDelete.title)
})

test('a blog can be updated', async () => {
  let response = await api.get('/api/blogs')
  const blogToUpdate = response.body[0]
  const updatedBlog = { 
    ...blogToUpdate,
    likes: blogToUpdate.likes + 1
  } 

  await api
    .put(`/api/blogs/${blogToUpdate._id}`)
    .send(updatedBlog)
    .expect(200)

  response = await api.get('/api/blogs')
  const blogsAtEnd = response.body
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  const updatedBlogAtEnd = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
  expect(updatedBlogAtEnd.likes).toBe(blogToUpdate.likes + 1)
})

afterAll(() => {
  mongoose.connection.close()
})
