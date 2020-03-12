import { useContext, useEffect } from 'react'
import store from '../store'
import NavbarLoginModal from './NavbarLoginModal'

const NavbarLoginButton = () => {
  const { state, dispatch } = useContext(store)
  const { login } = state

  const handleClick = () => {
    dispatch({
      type: 'SET_LOGIN_MODAL',
      payload: true
    })
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      // Escape key
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
      {login.modal.open && <NavbarLoginModal />}
    </>
  )
}

export default NavbarLoginButton
