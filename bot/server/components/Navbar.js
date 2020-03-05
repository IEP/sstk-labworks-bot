import React, { useContext, useState, useEffect } from 'react'
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

// TODO: Add Modal to Prompt Token

const LoginModal = () => {
  const { state, dispatch } = useContext(store)
  const { token } = state
  const [otp, setOtp] = useState('')

  const handleChange = (e) => {
    setOtp(e.target.value)
  }

  const handleLogin = () => {
    console.log('OTP', otp)
    axios.post('/api/login', {
      otp
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
      } else {
        dispatch({
          type: 'SET_LOGIN_MODAL',
          payload: false
        })
      }
    })
    // dispatch({
    //   type: 'SET_LOGIN_MODAL',
    //   payload: false
    // })
  }

  const handleClick = () => {
    handleLogin()
  }

  const handleEnter = (e) => {
    if (e.keyCode === 13) { // Enter key
      handleLogin()
    }
  }

  const handleClickClose = () => {
    setOtp('')
    dispatch({
      type: 'SET_LOGIN_MODAL',
      payload: false
    })
  }

  return (
    <div
      className="modal is-active"
    >
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Login</p>
        </header>
        <section className="modal-card-body">
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">OTP</label>
            </div>
            <div className="field-body field is-expanded">
              <input
                className="input"
                type="password"
                placeholder="123456"
                onChange={(e) => handleChange(e)}
                value={otp}
                onKeyDown={(e) => handleEnter(e)}
              />
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button
            className="button is-link"
            onClick={() => handleClick()}
          >
            Login
          </button>
        </footer>
      </div>
      <button
        className="modal-close is-large"
        onClick={() => handleClickClose()}
      />
    </div>
  )
}

const Login = () => {
  const { state, dispatch } = useContext(store)
  const { login } = state

  const handleClick = () => {
    dispatch({
      type: 'SET_LOGIN_MODAL',
      payload: true
    })
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) { // Escape key
      dispatch({
        type: 'SET_LOGIN_MODAL',
        payload: false
      })
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
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
      { login.modal.open && <LoginModal /> }
    </>
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