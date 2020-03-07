import { useContext, useEffect } from 'react'
import Router from 'next/router'
import store from '../store'
import axios from 'axios'
import useInterval from '../hooks/useInterval'
import SubmissionTable from '../components/SubmissionTable'

const Submission = () => {
  const { state, dispatch } = useContext(store)
  const { token, submission } = state
  if (!token) Router.push('/')

  const fetchSubmission = async () => {
    const res = await axios.get('/api/submission', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        kode_praktikum: submission.activeDeadline || '',
        page: submission.page || 0
      }
    })
    dispatch({
      type: 'SET_SUBMISSION',
      payload: res.data.results
    })
    dispatch({
      type: 'SET_SUBMISSION_TOTAL_PAGES',
      payload: res.data.totalPages
    })
  }

  useEffect(() => {
    fetchSubmission()
  }, [])

  useInterval(() => {
    fetchSubmission()
  }, 30 * 1000)

  return (
    <SubmissionTable />
  )
}

export default Submission