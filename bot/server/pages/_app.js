import React, { useContext, useEffect, useState } from 'react'
import App from 'next/app'
import axios from 'axios'
import store, { StateProvider } from '../store'

import '../styles/index.sass'
import Layout from '../components/Layout'

const StateInitializer = (props) => {
  const { state, dispatch } = useContext(store)
  const handleInitialized = props.onInitialized
  
  // Loader & Saver Hook - PLS Check; right now this only fired when login or logout
  useEffect(() => {
    // Load localState fron localStorage
    const localState = JSON.parse(localStorage.getItem('state')) || {}
    if (Object.keys(localState).length > 0) {
      dispatch({
        type: 'SET_ALL',
        payload: {...state, ...localState}
      })
    }
    // Check auth
    axios.post('/api/validate',
      {},
      {
        headers: { 'Authorization': `Bearer ${localState.token}` }
      }
    ).then((res) => {
      console.log('token', state.token)
      console.log(res.data)
      const { valid_token } = res.data
      if (!valid_token) { // If validator return true
        dispatch({
          type: 'SET_TOKEN',
          payload: ''
        })
      }
      // Make sure token is valid before rendering other component
      handleInitialized()
      dispatch({
        type: 'SET_READY'
      })
    })
  }, [])

  // Token Validator Hook - only fires once at the initial rendering
  return null
}

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