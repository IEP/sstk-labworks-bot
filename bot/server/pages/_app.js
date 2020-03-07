import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import store, { StateProvider } from '../store'

import '../styles/index.sass'
import Layout from '../components/Layout'

const StateInitializer = (props) => {
  const { state, dispatch } = useContext(store)
  const handleInitialized = props.onInitialized
  
  useEffect(() => {
    // Load localState from localStorage
    let localState
    try {
      localState = JSON.parse(localStorage.getItem('state') || {})
    } catch (err) {
      localState = {}
    }
    // Check auth
    axios.post('/api/validate',
      {},
      {
        headers: { Authorization: `Bearer ${localState.token}` }
      }
    ).then((res) => {
      const { valid_token } = res.data
      if (!valid_token) { // If validator return false
        dispatch({
          type: 'SET_TOKEN',
          payload: ''
        })
        localStorage.removeItem('state')
      } else { // only load state if only the token is verified to be legitimate
        dispatch({
          type: 'SET_ALL',
          payload: Object.assign({}, state, localState, { ready: false })
        })
      }
      // Make sure token is valid before rendering other component
      handleInitialized()
      // Activate state persistence to localStorage
      dispatch({
        type: 'SET_READY'
      })
    })
  }, [])

  // Token Validator Hook - only fires once at the initial rendering
  return null
}

const CustomApp = ({ Component, pageProps }) => {
  const [initialized, setInitialized] = useState(false)

  const onInitialized = () => {
    setInitialized(true)
  }

  return (
    <StateProvider>
      <StateInitializer onInitialized={onInitialized} />
      {
        initialized
          ? (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            )
          : <progress
              className="progress is-small is-dark"
              max="100"
            />
      }
    </StateProvider>
  )
}

export default CustomApp