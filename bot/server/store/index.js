import React, { createContext, useReducer } from 'react'

const initialState = {
  token: '',
  ready: false
}

const store = createContext(initialState)
const { Provider } = store

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'SET_TOKEN':
        return {
          ...state,
          token: action.payload
        }
      case 'SET_ALL':
        return Object.assign(state, action.payload)
      case 'SET_READY':
        return Object.assign(state, { ready: true })
      default:
        return state
    }
  }, initialState)
  return <Provider value={{ state, dispatch }}>{ children }</Provider>
}

export default store