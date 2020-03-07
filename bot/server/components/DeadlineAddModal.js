import { useContext, useEffect, useState  } from 'react'
import store from '../store'
import axios from 'axios'
import DeadlineAddModalInput from './DeadlineAddModalInput'

const DeadlineAddModal = () => {
  const [kode_praktikum, setKodePraktikum] = useState()
  const [start, setStart] = useState()
  const [end, setEnd] = useState()
  const { state, dispatch } = useContext(store)
  const { token } = state

  const rowEntry = [
    { action: setKodePraktikum, label: 'Kode Praktikum', placeholder: 'PKD01' },
    { action: setStart, label: 'Mulai', placeholder: '2020-12-31 00:00:00' },
    { action: setEnd, label: 'Selesai', placeholder: '2020-12-31 23:59:59' }
  ]

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) { // Escape key pressed
      dispatch({
        type: 'SET_DEADLINE_MODAL',
        payload: false
      })
    }
  }

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      handleSave()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSave = async () => {
    await axios.post('/api/deadline/add',{
      kode_praktikum,
      start,
      end,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    // Close modal
    dispatch({
      type: 'SET_DEADLINE_MODAL',
      payload: false
    })
    dispatch({
      type: 'SET_DEADLINE_UPDATED',
      payload: new Date()
    })
  }
  
  return (
    <div
      className="modal is-active"
      onKeyDown={handleEnter}
    >
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Tambah Deadline</p>
        </header>
        <section className="modal-card-body">
          {
            rowEntry.map((item) => (
              <DeadlineAddModalInput
                key={item.label}
                action={item.action}
                label={item.label}
                placeholder={item.placeholder}
              />
            ))
          }
        </section>
        <footer className="modal-card-foot">
          <button
            className="button is-success"
            onClick={() => handleSave()}
          >
            Simpan
          </button>
        </footer>
      </div>
      <button
        className="modal-close is-large"
        onClick={() => dispatch({
          type: 'SET_DEADLINE_MODAL',
          payload: false 
        })}
      />
    </div>
  )
}

export default DeadlineAddModal