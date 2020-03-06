import React, { useContext, useEffect, useState } from 'react'
import Router from 'next/router'
import store from '../store'
import axios from 'axios'
import useInterval from '../hooks/useInterval'
import { format, utcToZonedTime } from 'date-fns-tz'

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

const MahasiswaTableRow = ({ mahasiswa }) => {
  const { telegram_id, email, created_at } = mahasiswa
  const { state, dispatch } = useContext(store)
  const { token } = state
  const zoned_date = utcToZonedTime(
    created_at,
    'Asia/Jakarta'
  )
  const date = format(
    zoned_date,
    'dd MMMM yyyy HH:mm:ss',
    { timeZone: 'Asia/Jakarta' }
  )

  const handleClick = () => {
    axios.post('/api/mahasiswa/delete', {
      telegram_id
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    dispatch({
      type: 'SET_MAHASISWA_UPDATED',
      payload: new Date()
    })
  }
  
  return (
    <tr>
      <td>{ telegram_id }</td>
      <td>{ email }</td>
      <td>{ date }</td>
      <td>
        <button
          className="button is-danger"
          onClick={() => handleClick()}
        >
          Bebas Lab
        </button>
      </td>
    </tr>
  )
}

const MahasiswaTable = () => {
  const { state } = useContext(store)
  const mahasiswa = state.mahasiswa.list
  return (
    <table className="table is-striped is-hoverable is-fullwidth">
      <MahasiswaTableHead />
      <tbody>
        {
          mahasiswa.map((item) => (
            <MahasiswaTableRow
              key={item.telegram_id}
              mahasiswa={item}
            />
          ))
        }
      </tbody>
    </table>
  )
}

const Mahasiswa = () => {
  const { state, dispatch } = useContext(store)
  const { token, mahasiswa } = state
  if (!token) Router.push('/')
  // Fetch mahasiswa
  const fetchMahasiswa = async () => {
    const res = await axios.get('/api/mahasiswa', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    dispatch({
      type: 'SET_MAHASISWA',
      payload: res.data
    })
  }

  useEffect(() => {
    fetchMahasiswa()
  }, [mahasiswa.updated])

  // useEffect(() => {
  //   const refresh = setInterval(() => {
  //     fetchMahasiswa()
  //   }, 30 * 1000) // autofetch every 30 s
  //   return () => clearInterval(refresh)
  // }, [])
  useInterval(() => {
    fetchMahasiswa()
  }, 30 * 1000)

  return (
    <>
      {
        mahasiswa.list.length > 0
          ? <MahasiswaTable />
          : <div className="has-text-centered">
              Belum ada mahasiswa yang terdaftar
            </div>
      }
    </>
  )
}

export default Mahasiswa