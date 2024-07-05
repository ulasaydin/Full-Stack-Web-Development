import { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const createBlog = (event) => { 
    event.preventDefault()
    addBlog({
      title: title,
      author: author,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
  <form onSubmit={createBlog}>
    <div>
      title:
      <input
        type="text"
        value={title}
        name="Title"
        onChange={handleTitleChange}
        id="title-input"
      />
    </div>
    <div>
      author:
      <input
        type="text"
        value={author}
        name="Author"
        onChange={handleAuthorChange}
        id="author-input"
      />
    </div>
    <div>
      url:
      <input
        type="text"
        value={url}
        name="Url"
        onChange={handleUrlChange}
        id="url-input"
      />
    </div>
    <button id="create-button" type="submit">create</button>
  </form>
)}

export default BlogForm