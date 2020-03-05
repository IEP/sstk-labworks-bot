import React, { useContext, useEffect, useState } from 'react'
import App from 'next/app'
import axios from 'axios'
import store, { StateProvider } from '../store'

import '../styles/index.sass'
import Layout from '../components/Layout'

const StateInitializer = (props) => {
  const { state, dispatch } = useContext(store)
  const handleInitialized = props.onInitialized
  
  useEffect(() => {
    // Load localState fron localStorage
    const localState = JSON.parse(localStorage.getItem('state')) || {}
    // Check auth
    axios.post('/api/validate',
      {},
      {
        headers: { 'Authorization': `Bearer ${localState.token}` }
      }
    ).then((res) => {
      const { valid_token } = res.data
      if (!valid_token) { // If validator return false
        dispatch({
          type: 'SET_TOKEN',
          payload: ''
        })
      } else { // only load state if only the token is verified to be legitimate
        dispatch({
          type: 'SET_ALL',
          payload: Object.assign({}, state, localState, { ready: false })
        })
      }
      // Make sure token is valid before rendering other component
      handleInitialized()
      dispatch({
        type: 'SET_READY'
      })
    })
  }, [])

  // Refresh every 5 minutes to check the token
  useEffect(() => {
    const refresh = setInterval(() => {
      axios.post('/api/validate',
        {},
        {
          headers: { Authorization: `Bearer ${state.token}` }
        }
      ).then((res) => {
        const { valid_token } = res.data
        if (!valid_token) {
          // If the token is not valid then set it null
          dispatch({
            type: 'SET_TOKEN',
            payload: ''
          })
        }
      })
      return () => clearInterval(refresh)
    }, 5 * 60 * 1000) // Every 5 minutes
  }, [])

  // Token Validator Hook - only fires once at the initial rendering
  return null
}

// REFACTOR: change into function if possible
class MyApp extends App {
  constructor(props) {
    super(props)
    this.state = {
      initialized: false
    }
    this.onInitialized = this.onInitialized.bind(this)
  }

  onInitialized() {
    this.setState({
      initialized: true
    })
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <StateProvider>
        <StateInitializer onInitialized={this.onInitialized} />
        {
          this.state.initialized
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
}

export default MyApp