import React, { useContext, useEffect } from 'react'
import Router from 'next/router'
import store from '../store'
import axios from 'axios'
import { format, utcToZonedTime } from 'date-fns-tz'

const SubmissionTable = () => {
  const { state } = useContext(store)
  const { submission } = state
  return (
    <table className="table is-striped is-hoverable is-fullwidth">
      <SubmissionTableHead />
      <tbody>
        {
          submission.list.map((item) => (
            <SubmissionTableRow
              key={item.id}
              submission={item}
            />
          ))
        }
      </tbody>
    </table>
  )
}

const SubmissionTableHead = () => (
  <thead>
    <tr>
      <th>Kode Praktikum</th>
      <th>Telegram ID</th>
      <th>Alamat Surat Elektronik</th>
      <th>Nama Berkas</th>
      <th>Tanggal Pengumpulan</th>
    </tr>
  </thead>
)

const SubmissionTableRow = ({ submission }) => {
  const { telegram_id, email, kode_praktikum, filename, created_at } = submission
  const zoned_date = utcToZonedTime(
    created_at,
    'Asia/Jakarta'
  )
  const date = format(zoned_date, 'dd MMMM yyyy HH:mm:ss', { timeZone: 'Asia/Jakarta' })
  return (
    <tr>
      <td>{ kode_praktikum }</td>
      <td>{ telegram_id }</td>
      <td>{ email }</td>
      <td>{ filename }</td>
      <td>{ date }</td>
    </tr>
  )
}

const Submission = () => {
  const { state, dispatch } = useContext(store)
  const { token, submission } = state
  if (!token) Router.push('/')

  const fetchSubmission = async () => {
    const res = await axios.get('/api/submission', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    dispatch({
      type: 'SET_SUBMISSION',
      payload: res.data
    })
  }

  useEffect(() => {
    fetchSubmission()
    const refresh = setInterval(() => {
      fetchSubmission()
    }, 30 * 1000) // autofetch every 30 s
    return () => clearInterval(refresh)
  }, [])

  return (
    <>
      {
        submission.list.length > 0
          ? <SubmissionTable submission={submission.list} />
          : <div className="has-text-centered">
              Belum ada laporan praktikum yang telah dikumpulkan
            </div>
      }
    </>
  )
}

export default Submission