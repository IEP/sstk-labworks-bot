import React, { createContext, useReducer, useEffect } from 'react'
import produce from 'immer'
import axios from 'axios'
import useInterval from '../hooks/useInterval'

const initialState = {
  token: '',
  ready: false,
  burgerMenu: '',
  deadline: {
    list: [],
    modal: {
      open: false
    },
    edit: {
      kode_praktikum: '',
      start: '',
      end: ''
    },
    delete: {
      kode_praktikum: ''
    },
    updated: ''
  },
  mahasiswa: {
    list: [],
    delete: {
      telegram_id: ''
    },
    orderBy: '',
    page: 0,
    totalPages: 0,
    updated: ''
  },
  submission: {
    list: [],
    activeDeadline : '',
    orderBy: '',
    page: 0,
    totalPages: 0
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
      case 'TOGGLE_MENU':
        draft.burgerMenu = !draft.burgerMenu
        return
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
      case 'SET_DEADLINE_EDIT':
        draft.deadline.edit.kode_praktikum = action.payload.kode_praktikum
        draft.deadline.edit.start = action.payload.start
        draft.deadline.edit.end = action.payload.end
        return
      case 'SET_DEADLINE_DELETE_MODAL':
        draft.deadline.delete.kode_praktikum = action.payload
        return
      case 'SET_MAHASISWA':
        draft.mahasiswa.list = action.payload
        return
      case 'SET_MAHASISWA_DELETE_MODAL':
        draft.mahasiswa.delete.telegram_id = action.payload
        return
      case 'SET_MAHASISWA_PAGE':
        draft.mahasiswa.page = action.payload
        return
      case 'SET_MAHASISWA_ORDER_BY':
        draft.mahasiswa.orderBy = action.payload
        return
      case 'SET_MAHASISWA_TOTAL_PAGES':
        draft.mahasiswa.totalPages = action.payload
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
      case 'SET_SHOW_DEADLINE':
        draft.submission.activeDeadline = action.payload
        return
      case 'SET_SUBMISSION_PAGE':
        draft.submission.page = action.payload
        return
      case 'SET_SUBMISSION_ORDER_BY':
        draft.submission.orderBy = action.payload
        return
      case 'SET_SUBMISSION_TOTAL_PAGES':
        draft.submission.totalPages = action.payload
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
  // Check token function
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
        localStorage.removeItem('state')
      }
    })
  }
  // Check token every 5 minutes using custom hooks
  useInterval(() => {
    if (state.token) {
      checkToken()
    }
  }, 5 * 60 * 1000)
  // Rendered
  return <Provider value={{ state, dispatch }}>{ children }</Provider>
}

export default store