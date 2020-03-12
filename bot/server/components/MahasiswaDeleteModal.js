import { useContext, useEffect, useState } from 'react'
import store from '../store'
import axios from 'axios'

const MahasiswaDeleteModal = () => {
  const { state, dispatch } = useContext(store)
  const { token, mahasiswa } = state
  const telegram_id = mahasiswa.delete.telegram_id
  const email = mahasiswa.list
    .filter((item) => item.telegram_id === telegram_id)
    .map((item) => item.email)
  const [otp, setOtp] = useState('')

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      // Escape key
      dispatch({
        type: 'SET_MAHASISWA_DELETE_MODAL',
        payload: ''
      })
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
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
      '/api/mahasiswa/delete',
      {
        telegram_id,
        otp
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    dispatch({
      type: 'SET_MAHASISWA_DELETE_MODAL',
      payload: ''
    })
    dispatch({
      type: 'SET_MAHASISWA_UPDATED',
      payload: new Date()
    })
  }

  return (
    <div className="modal is-active" onKeyDown={handleEnter}>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Bebas Lab - {email}</p>
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
            type: 'SET_MAHASISWA_DELETE_MODAL',
            payload: ''
          })
        }
      />
    </div>
  )
}

export default MahasiswaDeleteModal
