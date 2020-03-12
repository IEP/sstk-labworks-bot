import { useContext } from 'react'
import store from '../store'

const NavbarTitle = () => {
  const { state, dispatch } = useContext(store)
  const { burgerMenu } = state

  return (
    <div className="navbar-brand">
      <a className="navbar-item has-text-info">
        <span className="icon is-large">
          <i className="fab fa-lg fa-telegram"></i>
        </span>
        (Bukan) Bot SSTK - @sstk_bukan_bot
      </a>
      <a
        className={
          burgerMenu ? 'navbar-burger burger is-active' : 'navbar-burger burger'
        }
        onClick={() =>
          dispatch({
            type: 'TOGGLE_MENU'
          })
        }
      >
        <span />
        <span />
        <span />
      </a>
    </div>
  )
}

export default NavbarTitle
