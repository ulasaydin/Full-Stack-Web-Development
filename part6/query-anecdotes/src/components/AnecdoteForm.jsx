import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotification } from '../NotificationContext'


const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { dispatch } = useNotification()


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
      dispatch({ type: 'SET_NOTIFICATION', data: `you created '${content}'` })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)

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
