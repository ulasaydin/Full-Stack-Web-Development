import { render, screen } from '@testing-library/react'
import { test } from 'vitest'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('form calls the event handler with the right details when a new blog is created', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  const {container} = render(
    <BlogForm
      addBlog={createBlog}
    />
  )

  const titleInput = container.querySelector('#title-input')
  const authorInput = container.querySelector('#author-input')
  const urlInput = container.querySelector('#url-input')
  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'Test Title')
  await user.type(authorInput, 'Test Author')
  await user.type(urlInput, 'http://testurl.com')
  await user.click(sendButton)

  expect(createBlog).toHaveBeenCalledTimes(1)

  expect(createBlog.mock.calls[0][0].title).toBe('Test Title')
  expect(createBlog.mock.calls[0][0].author).toBe('Test Author')
  expect(createBlog.mock.calls[0][0].url).toBe('http://testurl.com')
})