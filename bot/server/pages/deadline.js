import React, { useContext, useState, useEffect } from 'react'
import Router from 'next/router'
import store from '../store'
import axios from 'axios'
import { format, utcToZonedTime } from 'date-fns-tz'

const DeadlineAddButton = () => {
  const { dispatch } = useContext(store)
  return (
    <div className="buttons has-addons">
      <button
        className="button is-primary"
        onClick={() => dispatch({
          type: 'SET_DEADLINE_MODAL', payload: true }
        )}
      >
        Tambah Deadline
      </button>
    </div>
  )
}

const DeadlineModalInput = (props) => {
  return (
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">{props.label}</label>
      </div>
      <div className="field-body field is-expanded">
        <input
          className="input"
          type="text"
          placeholder={props.placeholder} 
          onChange={(e) => props.action(e.target.value)}
        />
      </div>
    </div>
  )
}

const DeadlineModal = () => {
  const [kode_praktikum, setKodePraktikum] = useState()
  const [start, setStart] = useState()
  const [end, setEnd] = useState()
  const { state, dispatch } = useContext(store)
  const { token, deadline } = state

  const rowEntry = [
    { action: setKodePraktikum, label: 'Kode Praktikum', placeholder: 'PKD01' },
    { action: setStart, label: 'Mulai', placeholder: '2020-12-31 00:00:00' },
    { action: setEnd, label: 'Selesai', placeholder: '2020-12-31 23:59:59' }
  ]

  const handleKeyPress = (e) => {
    if (e.keyCode === 27) { // Escape key pressed
      dispatch({
        type: 'SET_DEADLINE_MODAL',
        payload: false
      })
    }
  }

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
    // Clear local state
    setKodePraktikum('')
    setStart('')
    setEnd('')
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
    <div className={deadline.modal.open ? "modal is-active" : "modal"} onKeyDown={handleKeyPress} >
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Tambah Deadline</p>
        </header>
        <section className="modal-card-body">
          {
            rowEntry.map((item) => (
              <DeadlineModalInput
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
        onClick={() => dispatch({ type: 'SET_DEADLINE_MODAL', payload: false })}
      />
    </div>
  )
}

const DeadlineTableHead = () => (
  <thead>
    <tr>
      <th>Kode Praktikum</th>
      <th>Mulai</th>
      <th>Selesai</th>
      <th>Aksi</th>
    </tr>
  </thead>
)

const DeadlineTableRow = ({ item }) => {
  const { kode_praktikum, start, end } = item
  const { state, dispatch } = useContext(store)
  const { token } = state
  const zoned_start = utcToZonedTime(
    start,
    'Asia/Jakarta'
  )
  const zoned_end = utcToZonedTime(
    end,
    'Asia/Jakarta'
  )
  const str_start = format(
    zoned_start,
    'dd MMMM yyyy HH:mm:ss',
    { timeZone: 'Asia/Jakarta' }
  )
  const str_end = format(
    zoned_end,
    'dd MMMM yyyy HH:mm:ss',
    { timeZone: 'Asia/Jakarta' }
  )

  const handleClick = () => {
    axios.post('/api/deadline/delete', {
      kode_praktikum
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    dispatch({
      type: 'SET_DEADLINE_UPDATED',
      payload: new Date()
    })
  }

  return (
    <tr>
      <td>{ kode_praktikum }</td>
      <td>{ str_start }</td>
      <td>{ str_end }</td>
      <td>
        <div className="buttons">
          {/* Ubah: only allow to readjust start and end date */}
          {/* <button
            className="button is-primary"
            disabled
          >
            Ubah
          </button> */}
          <button
            className="button is-danger"
            onClick={() => handleClick()}
          >
            Hapus
          </button>
        </div>
      </td>
    </tr>
  )
}

const DeadlineTable = () => {
  const { state } = useContext(store)
  const { deadline } = state
  return (
    <table className="table is-striped is-hoverable is-fullwidth">
      <DeadlineTableHead />
      <tbody>
        {
          deadline.list.map((item) => (
            <DeadlineTableRow key={item.kode_praktikum} item={item} />
          ))
        }
      </tbody>
    </table>
  )
}

const Deadline = () => {
  const { state, dispatch } = useContext(store)
  const { token, deadline } = state
  if (!token) Router.push('/')

  const fetchDeadline = async () => {
    const res = await axios.get('/api/deadline', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    dispatch({
      type: 'SET_DEADLINE',
      payload: res.data
    })
  }

  useEffect(() => {
    fetchDeadline()
  }, [deadline.updated])

  useEffect(() => {
    const refresh = setInterval(() => {
      fetchDeadline()
      console.log('refresh')
    }, 30 * 1000) // autofetch every 30 s
    return () => clearInterval(refresh)
  }, [])

  const handleKeyPress = (e) => {
    if (e.keyCode === 27) { // Escape key pressed
      dispatch({
        type: 'SET_DEADLINE_MODAL',
        payload: false
      })
    }
  }

  return (
    <div onKeyDown={(e) => handleKeyPress(e)}>
      <DeadlineAddButton />
      {
        deadline.list.length > 0
          ? <DeadlineTable />
          : <div className="has-text-centered">
              Belum ada deadline yang telah diatur
            </div>
      }
      <DeadlineModal />
    </div>
  )
}

export default Deadline