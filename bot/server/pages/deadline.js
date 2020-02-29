import React, { useContext } from 'react'
import Router from 'next/router'
import store from '../store'

const Deadline = () => {
  const context = useContext(store)
  const { token } = context.state
  if (!token) Router.push('/')
  return (
    <>Deadline</>
  )
}

export default Deadline