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

test('clicking the button shows the url and likes', async () => {
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

  let urlElement = screen.queryByText(blog.url)
  let likesElement = screen.queryByText(`likes ${blog.likes}`)
  
  expect(urlElement).not.toBeInTheDocument()
  expect(likesElement).not.toBeInTheDocument()

  const button = screen.getByText('view')
  await button.click()
  
  urlElement = screen.queryByText(blog.url)
  likesElement = screen.queryByText(`likes ${blog.likes}`)
  
  expect(urlElement).toBeInTheDocument()
  expect(likesElement).toBeInTheDocument()
})