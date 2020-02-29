import React from 'react'
import Link from 'next/link'
import store from '../store'

const Menu = (props) => {
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
          onClick={() => props.loginHandle('')}
        >
          Logout
        </a>
      </div>
    </div>
  )
}

const Login = (props) => {
  return (
    <div className="navbar-menu">
      <div className="navbar-end">
        <a
          className="navbar-item has-background-info has-text-white"
          onClick={() => props.loginHandle('loginCui')}
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
  const context = React.useContext(store)
  const { token } = context.state
  const loginHandle = (payload) => {
    const { dispatch } = context
    dispatch({
      type: 'SET_TOKEN',
      payload
    })
  }
  return (
    <nav className="navbar">
      <Title />
      { token
        ? <Menu loginHandle={loginHandle} />
        : <Login loginHandle={loginHandle}/>
      }
    </nav>
  )

}

export default Navbar