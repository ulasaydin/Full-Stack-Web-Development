import { useState } from "react"

const Blog = ({ blog, updateBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  
  const handleLikes = async () => {
    setLikes(blog.likes + 1)
    
    const updatedBlog = { 
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    updateBlog(blog.id, updatedBlog)
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
        <p>likes {likes} <button onClick={handleLikes}>like</button> </p>
        <p>{blog.user.name}</p>
      </div>
    </div>
  )
}

export default Blog
