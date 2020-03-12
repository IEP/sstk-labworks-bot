import { useContext, useEffect } from 'react'
import Router from 'next/router'
import store from '../store'
import axios from 'axios'
import useInterval from '../hooks/useInterval'
import MahasiswaTable from '../components/MahasiswaTable'
import MahasiswaDeleteModal from '../components/MahasiswaDeleteModal'

const Mahasiswa = () => {
  const { state, dispatch } = useContext(store)
  const { token, mahasiswa } = state
  if (!token) Router.push('/')
  // Fetch mahasiswa
  const fetchMahasiswa = async () => {
    const page = mahasiswa.page > mahasiswa.totalPages ? 0 : mahasiswa.page || 0
    const res = await axios.get('/api/mahasiswa', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        page,
        orderBy: mahasiswa.orderBy || '',
        search: mahasiswa.search || ''
      }
    })
    dispatch({
      type: 'SET_MAHASISWA',
      payload: res.data.results
    })
    dispatch({
      type: 'SET_MAHASISWA_PAGE',
      payload: page
    })
    dispatch({
      type: 'SET_MAHASISWA_TOTAL_PAGES',
      payload: res.data.totalPages
    })
  }

  useEffect(() => {
    fetchMahasiswa()
  }, [mahasiswa.updated, mahasiswa.orderBy, mahasiswa.search, mahasiswa.page])

  useInterval(() => {
    fetchMahasiswa()
  }, 30 * 1000)

  return (
    <>
      <MahasiswaTable />
      {(mahasiswa.delete.telegram_id || false) && <MahasiswaDeleteModal />}
    </>
  )
}

export default Mahasiswa
