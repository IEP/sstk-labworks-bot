import React, { createContext, useReducer, useEffect } from 'react'
import produce from 'immer'

const initialState = {
  token: '',
  ready: false,
  deadline: {
    list: [],
    modal: {
      open: false
    },
    updated: ''
  },
  mahasiswa: {
    list: [],
    updated: ''
  },
  submission: {
    list: []
  }
}

const store = createContext(initialState)
const { Provider } = store

export const StateProvider = ({ children }) => {
  // Initiate Reducer
  const [state, dispatch] = useReducer(produce((draft, action) => {
    switch (action.type) {
      case 'SET_TOKEN':
        draft.token = action.payload
        return
      case 'SET_DEADLINE':
        draft.deadline.list = action.payload
        return
      case 'SET_DEADLINE_MODAL':
        draft.deadline.modal.open = action.payload
        return
      case 'SET_DEADLINE_UPDATED':
        draft.deadline.updated = action.payload
        return
      case 'SET_MAHASISWA':
        draft.mahasiswa.list = action.payload
        return
      case 'SET_MAHASISWA_UPDATED':
        draft.mahasiswa.updated = action.payload
        return
      case 'SET_READY':
        draft.ready = true
        return
      case 'SET_SUBMISSION':
        draft.submission.list = action.payload
        return
      case 'SET_ALL': // Load state from localStorage
        return action.payload
    }
  }), initialState)
  // Add hooks to persist state on localStorage
  useEffect(() => {
    if (state.ready) {
      localStorage.setItem('state', JSON.stringify(state))
    }
  }, [state])
  // Rendered
  return <Provider value={{ state, dispatch }}>{ children }</Provider>
}

export default store