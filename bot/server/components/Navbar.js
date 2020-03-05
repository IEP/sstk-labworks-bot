import React, { useContext } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import store from '../store'
import axios from 'axios'

const Menu = () => {
  const { dispatch } = useContext(store)

  const handleClick = () => {
    dispatch({
      type: 'SET_TOKEN',
      payload: ''
    })
    Router.push('/')
  }

  return (
    <div className="navbar-menu">
      <div className="navbar-end">
        <Link href="/">
          <a className="navbar-item">
            Home
          </a>
        </Link>
        <Link href="/mahasiswa">
          <a className="navbar-item">
            Mahasiswa
          </a>
        </Link>
        <Link href="/deadline">
          <a className="navbar-item">
            Deadline
          </a>
        </Link>
        <Link href='/submission'>
          <a className="navbar-item">
            Submission
          </a>
        </Link>
        <a
          className="navbar-item has-background-info has-text-white"
          onClick={() => handleClick()}
        >
          Logout
        </a>
      </div>
    </div>
  )
}

const Login = () => {
  const { state, dispatch } = useContext(store)
  const { token } = state
  
  const handleClick = () => {
    axios.post('/api/login', {
      password: 'benar'
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      const { correct, token } = res.data
      if (correct) {
        dispatch({
          type: 'SET_TOKEN',
          payload: token
        })
      }
    })
  }

  return (
    <div className="navbar-menu">
      <div className="navbar-end">
        <a
          className="navbar-item has-background-info has-text-white"
          onClick={() => handleClick()}
        >
          Login
        </a>
      </div>
    </div>
  )
}

const Title = () => {
  return (
    <div className="navbar-brand">
      <a className="navbar-item has-text-info">
        <span className="icon is-large">
          <i className="fab fa-lg fa-telegram"></i>
        </span>
        (Bukan) Bot SSTK - @sstk_bukan_bot
      </a>
    </div>
  )
}

const Navbar = () => {
  const { state } = useContext(store)
  const { token } = state
  
  return (
    <nav className="navbar">
      <Title />
      { token
        ? <Menu />
        : <Login />
      }
    </nav>
  )

}

export default Navbar