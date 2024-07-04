import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { test } from 'vitest'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Arto Hellas',
    likes: 10,
    url: 'http://example.com',
    user: { id: '1', name: 'Tester', username: 'tester' },
  }
  const user = {
    username: 'tester',
  }

  render(<Blog user={user} blog={blog} />)
  
  const titleAuthorElement = screen.getByText(`${blog.title} ${blog.author}`)
  
  expect(titleAuthorElement).toBeInTheDocument()

  const urlElement = screen.queryByText(blog.url)
  const likesElement = screen.queryByText(`likes ${blog.likes}`)
  
  expect(urlElement).not.toBeInTheDocument()
  expect(likesElement).not.toBeInTheDocument()
})
