import { useContext, useEffect, useState } from 'react'
import store from '../store'
import axios from 'axios'

const DeadlineDeleteModal = () => {
  const { state, dispatch } = useContext(store)
  const { token, deadline } = state
  const kode_praktikum = deadline.delete.kode_praktikum
  const [otp, setOtp] = useState('')

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      // Escape key
      dispatch({
        type: 'SET_DEADLINE_DELETE_MODAL',
        payload: ''
      })
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.addEventListener('keydown', handleKeyDown)
  }, [])

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      handleDelete()
    }
  }

  const handleChange = (e) => {
    setOtp(e.target.value)
  }

  const handleDelete = async () => {
    await axios.post(
      '/api/deadline/delete',
      {
        kode_praktikum,
        otp
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    dispatch({
      type: 'SET_DEADLINE_DELETE_MODAL',
      payload: ''
    })
    dispatch({
      type: 'SET_DEADLINE_UPDATED',
      payload: new Date()
    })
  }

  return (
    <div className="modal is-active" onKeyDown={handleEnter}>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Hapus Deadline - {kode_praktikum}</p>
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
          <button className="button is-danger" onClick={() => handleDelete()}>
            Hapus
          </button>
        </footer>
      </div>
      <button
        className="modal-close is-large"
        onClick={() =>
          dispatch({
            type: 'SET_DEADLINE_DELETE_MODAL',
            payload: ''
          })
        }
      />
    </div>
  )
}

export default DeadlineDeleteModal
