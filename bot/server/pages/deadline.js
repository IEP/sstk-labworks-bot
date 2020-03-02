import React, { useContext, useState, useEffect } from 'react'
import Router from 'next/router'
import store from '../store'
import axios from 'axios'
import { format, utcToZonedTime } from 'date-fns-tz'

const DeadlineAddButton = (props) => (
  <div className="buttons has-addons">
    <button
      className="button is-primary"
      onClick={() => props.action(true)}
    >
      Tambah Deadline
    </button>
  </div>
)

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

const DeadlineModal = (props) => {
  const [kode_praktikum, setKodePraktikum] = useState()
  const [start, setStart] = useState()
  const [end, setEnd] = useState()

  const rowEntry = [
    { action: setKodePraktikum, label: 'Kode Praktikum', placeholder: 'PKD01' },
    { action: setStart, label: 'Mulai', placeholder: '2020-12-31 00:00:00' },
    { action: setEnd, label: 'Selesai', placeholder: '2020-12-31 23:59:59' }
  ]

  const handleKeyPress = (e) => {
    if (e.keyCode === 27) { // Escape key pressed
      props.action(false)
    }
  }

  const handleSave = async () => {
    axios.post('/api/deadline/add',{
      kode_praktikum,
      start,
      end
    }).then((res) => {
      console.log(res.data)
    })
    props.action(false)
  }
  
  return (
    <div className="modal is-active" onKeyDown={handleKeyPress} >
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
        onClick={() => props.action(false)}
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

const DeadlineTableRow = ({ item, update }) => {
  const { kode_praktikum, start, end } = item
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
    })
    const random = Math.random()
    update(random)
  }

  return (
    <tr>
      <td>{ kode_praktikum }</td>
      <td>{ str_start }</td>
      <td>{ str_end }</td>
      <td>
        <div className="buttons">
          <button
            className="button is-primary"
            disabled
          >
            Ubah
          </button>
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

const DeadlineTable = (props) => (
  <table className="table is-striped is-hoverable is-fullwidth">
    <DeadlineTableHead />
    <tbody>
      {
        props.deadline.map((item) => (
          <DeadlineTableRow key={item.kode_praktikum} item={item} update={props.update} />
        ))
      }
    </tbody>
  </table>
)

const Deadline = () => {
  const context = useContext(store)
  const { state } = context
  const { token } = state
  const [deadline, setDeadline] = useState([])
  const [modal, setModal] = useState(false)
  const [updated, setUpdated] = useState(Math.random())
  if (!token) Router.push('/')

  useEffect(() => {
    axios.get('/api/deadline')
    .then((res) => {
      setDeadline(res.data)
    })
  }, [modal, updated])

  const handleKeyPress = (e) => {
    if (e.keyCode === 27) { // Escape key pressed
      setModal(false)
    }
  }

  return (
    <div onKeyDown={(e) => handleKeyPress(e)}>
      <DeadlineAddButton action={setModal} />
      {
        deadline.length > 0
          ? <DeadlineTable deadline={deadline} update={setUpdated} />
          : <div className="has-text-centered">
              Tidak ada deadline
            </div>
      }
      {
        modal && <DeadlineModal action={setModal} />
      }
    </div>
  )
}

export default Deadline