import React, { useContext, useEffect, useState } from 'react'
import Router from 'next/router'
import store from '../store'
import axios from 'axios'
import { format, utcToZonedTime } from 'date-fns-tz'

// Create table with button to unregister
// | Telegram ID | Email | Unregister (Bebas Bot) |

const MahasiswaTableHead = () => (
  <thead>
    <tr>
      <th>Telegram ID</th>
      <th>Alamat Surat Elektronik</th>
      <th>Tanggal Registrasi</th>
      <th>Aksi</th>
    </tr>
  </thead>
)

const MahasiswaTableRow = ({ mahasiswa, update }) => {
  const { telegram_id, email, created_at } = mahasiswa
  const zoned_date = utcToZonedTime(
    created_at,
    'Asia/Jakarta'
  )
  const date = format(zoned_date, 'dd MMMM yyyy HH:mm:ss', { timeZone: 'Asia/Jakarta' })

  const handleClick = () => {
    axios.post('/api/mahasiswa/delete', {
      telegram_id
    })
    update(Math.random())
  }
  
  return (
    <tr>
      <td>{ telegram_id }</td>
      <td>{ email }</td>
      <td>{ date }</td>
      <td>
        <button
          className="button is-danger"
          onClick={handleClick}
        >
          Bebas Lab
        </button>
      </td>
    </tr>
  )
}

const MahasiswaTable = ({ mahasiswa, update }) => (
  <table className="table is-striped is-hoverable is-fullwidth">
    <MahasiswaTableHead />
    <tbody>
      {
        mahasiswa.map((item) => (
          <MahasiswaTableRow
            key={item.telegram_id}
            mahasiswa={item}
            update={update}
          />
        ))
      }
    </tbody>
  </table>
)

const Mahasiswa = () => {
  const context = useContext(store)
  const [mahasiswa, setMahasiswa] = useState([])
  const [updated, setUpdated] = useState(Math.random())
  const { token } = context.state
  if (!token) Router.push('/')
  // Fetch mahasiswa
  useEffect(() => {
    axios.get('/api/mahasiswa')
    .then((res) => {
      setMahasiswa(res.data)
    })
  }, [updated])

  return (
    <>
      {
        mahasiswa.length > 0
          ? <MahasiswaTable mahasiswa={mahasiswa} update={setUpdated} />
          : <div className="has-text-centered">
              Belum ada mahasiswa mendaftar
            </div>
      }
    </>
  )
}

export default Mahasiswa