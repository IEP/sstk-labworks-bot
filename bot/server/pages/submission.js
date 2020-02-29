import React, { useContext } from 'react'
import Router from 'next/router'
import store from '../store'

const Submission = () => {
  const context = useContext(store)
  const { token } = context.state
  if (!token) Router.push('/')
  return (
    <>Submission</>
  )
}

export default Submission