import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  const [notification, setNotification] = useState(null)
  const [notificationClass, setNotificationClass] = useState('notification')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }
  , [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      setNotification('wrong username or password')
      setNotificationClass('error')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setNotificationClass('notification')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
    catch (exception) {
      setNotification('Failed to add blog')
      setNotificationClass('error')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const updateBlog = async (id, blogObject) => {
    try {
      const returnedBlog = await blogService.update(id, blogObject)
      returnedBlog.user = blogs.find(blog => blog.id === id).user
      setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      setNotification(`blog ${returnedBlog.title} updated`)
      setNotificationClass('notification')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
    catch (exception) {
      setNotification('Failed to update blog')
      setNotificationClass('error')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      setNotification('Blog is successfully deleted')
      setNotificationClass('notification')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
    catch (exception) {
      setNotification('Failed to delete blog')
      setNotificationClass('error')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {

      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
    } catch (exception) {
      setNotification('Failed to logout')
      setNotificationClass('error')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const compareLikes = (a, b) => {
    return b.likes - a.likes
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification} styleClass={notificationClass} />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} styleClass={notificationClass} />
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button> </p>
      <h2>create new</h2>
      <Togglable buttonLabel='create new blog'>
        <BlogForm
          addBlog={addBlog}
        />
      </Togglable>
      {blogs.sort(compareLikes).map(blog =>

        <Blog key={blog.id} blog={blog} user={user} updateBlog={updateBlog} deleteBlog={deleteBlog} />
      )}
    </div>
  )
}

export default App