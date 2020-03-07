import { useContext, useState, useEffect } from 'react'
import store from '../store'
import axios from 'axios'
import DeadlineAddModalInput from '../components/DeadlineAddModalInput'

const DeadlineEditModal = () => {
  const { state, dispatch } = useContext(store)
  const { token, deadline } = state
  const kode_praktikum = deadline.edit.kode_praktikum
  const [start, setStart] = useState(deadline.edit.start)
  const [end, setEnd] = useState(deadline.edit.end)

  const rowEntry = [
    {
      action: setStart,
      label: 'Mulai',
      value: start,
      placeholder: '2020-12-31 00:00:00'
    },
    {
      action: setEnd,
      label: 'Selesai',
      value: end,
      placeholder: '2020-12-31 23:59:59'
    }
  ]

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      dispatch({
        type: 'SET_DEADLINE_EDIT',
        payload: {
          kode_praktikum: '',
          start: '',
          end: ''
        }
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
    await axios.post('/api/deadline/edit', {
      kode_praktikum,
      start,
      end
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    dispatch({
      type: 'SET_DEADLINE_EDIT',
      payload: {
        kode_praktikum: '',
        start: '',
        end: ''
      }
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
          <p className="modal-card-title">
            Ubah Deadline - {kode_praktikum}
          </p>
        </header>
        <section className="modal-card-body">
          {
            rowEntry.map((item) => (
              <DeadlineAddModalInput
                key={item.label}
                action={item.action}
                label={item.label}
                placeholder={item.placeholder}
                value={item.value}
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
          type: 'SET_DEADLINE_EDIT',
          payload: {
            kode_praktikum: '',
            start: '',
            end: ''
          }
        })}
      />
    </div>
  )
}

export default DeadlineEditModal