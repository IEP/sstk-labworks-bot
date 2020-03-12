import { useContext, useState } from 'react'
import store from '../store'
import axios from 'axios'

const NavbarLoginModal = () => {
  const { state, dispatch } = useContext(store)
  const { token } = state
  const [otp, setOtp] = useState('')

  const handleChange = (e) => {
    setOtp(e.target.value)
  }

  const handleLogin = () => {
    axios
      .post(
        '/api/login',
        {
          otp
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((res) => {
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
  }

  const handleClick = () => {
    handleLogin()
  }

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      // Enter key
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
    <div className="modal is-active">
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
          <button className="button is-link" onClick={() => handleClick()}>
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

export default NavbarLoginModal
