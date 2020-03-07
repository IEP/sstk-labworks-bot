import React, { useContext } from 'react'
import store from '../store'
import NavbarTitle from '../components/NavbarTitle'
import NavbarMenu from '../components/NavbarMenu'
import NavbarLoginButton from '../components/NavbarLoginButton'

const Navbar = () => {
  const { state } = useContext(store)
  const { token } = state
  
  return (
    <nav className="navbar">
      <NavbarTitle />
      { token
          ? <NavbarMenu />
          : <NavbarLoginButton />
      }
    </nav>
  )

}

export default Navbar