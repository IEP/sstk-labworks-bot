import React, { createContext, useReducer, useEffect } from 'react'
import produce from 'immer'
import axios from 'axios'

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
  },
  login: {
    modal: {
      open: false
    }
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
      case 'SET_LOGIN_MODAL':
        draft.login.modal.open = action.payload
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
  // Check Token every 5 minutes
  const checkToken = () => {
    axios.post('/api/validate',
      {},
      {
        headers: { Authorization: `Bearer ${state.token}` }
      }
    ).then((res) => {
      const { valid_token } = res.data
      if (!valid_token) {
        dispatch({
          type: 'SET_TOKEN',
          payload: ''
        })
      }
    })
  }
  useEffect(() => {
    const refresh = setInterval(() => {
      console.log('Checking token')
      checkToken()
    }, 60 * 1000)
    return () => clearInterval(refresh)
  })
  // Rendered
  return <Provider value={{ state, dispatch }}>{ children }</Provider>
}

export default store