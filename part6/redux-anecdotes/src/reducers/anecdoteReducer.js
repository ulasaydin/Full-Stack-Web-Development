import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteAnecdote(state, action) {
      const changedAnecdote = action.payload
      return state.map(anecdote =>
        anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote
      )
    },
    appendAnecdote(state, action) {
      return [...state, action.payload]
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = {
      content,
      id: getId(),
      votes: 0
    }
    await anecdoteService.createNew(anecdote)
    dispatch(appendAnecdote(anecdote))
  }
}

export const voteForAnecdote = anecdote => {
  return async dispatch => {
    const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    await anecdoteService.update(changedAnecdote)
    dispatch(voteAnecdote(changedAnecdote))
  }
}
export const { voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer