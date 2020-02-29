import React, { useContext } from 'react'
import Router from 'next/router'
import store from '../store'

const Mahasiswa = () => {
  const context = useContext(store)
  const { token } = context.state
  if (!token) Router.push('/')
  return (
    <>Mahasiswa</>
  )
}

export default Mahasiswa