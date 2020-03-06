import React, { useContext, useEffect, useState } from 'react'
import Router from 'next/router'
import store from '../store'
import axios from 'axios'
import useInterval from '../hooks/useInterval'
import MahasiswaTable from '../components/MahasiswaTable'

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