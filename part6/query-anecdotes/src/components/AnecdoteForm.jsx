import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })



  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    if (content.length >= 5) {
      newAnecdoteMutation.mutate({ content, votes: 0 })
      event.target.anecdote.value = ''

    } else {
      alert('anecdote must be at least 5 characters long')
    }
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
