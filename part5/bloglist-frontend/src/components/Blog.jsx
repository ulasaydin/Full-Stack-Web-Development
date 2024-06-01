import { useState } from 'react'

const Blog = ({ user, blog, updateBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLikes = async () => {

    const updatedBlog = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    updateBlog(blog.id, updatedBlog)
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }

  if (!visible) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button>
      </div>
      <div>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={handleLikes}>like</button> </p>
        <p>{blog.user.name}</p>
        {user.username === blog.user.username && <button onClick={handleDelete}>remove</button>}
      </div>
    </div>
  )
}

export default Blog
