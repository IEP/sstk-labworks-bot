import { useContext, useEffect } from 'react'
import store from '../store'
import Router from 'next/router'
import NavbarMenuItem from '../components/NavbarMenuItem'

const NavbarMenu = () => {
  const { dispatch } = useContext(store)

  const menuEntry = [
    { label: 'Home', href: '/' },
    { label: 'Mahasiswa', href: '/mahasiswa' },
    { label: 'Deadine', href: '/deadline' },
    { label: 'Submission', href: '/submission' }
  ]

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
        {
          menuEntry.map(({ label, href }) => (
            <NavbarMenuItem
              key={label}
              label={label}
              href={href}
            />
          ))
        }
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