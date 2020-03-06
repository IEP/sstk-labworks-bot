import { useContext, useEffect } from 'react'
import store from '../store'
import Link from 'next/link'
import Router from 'next/router'

const NavbarMenu = () => {
  const { dispatch } = useContext(store)

  useEffect(() => {
    dispatch({
      type: 'SET_LOGIN_MODAL',
      payload: false
    })
  }, [])

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

export default NavbarMenu