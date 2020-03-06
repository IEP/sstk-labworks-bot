import React, { useContext, useEffect } from 'react'
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
      }
    })
    dispatch({
      type: 'SET_SUBMISSION',
      payload: res.data
    })
  }

  useEffect(() => {
    fetchSubmission()
  }, [])

  useInterval(() => {
    fetchSubmission()
  }, 30 * 1000)

  return (
    <>
      {
        submission.list.length > 0
          ? <SubmissionTable />
          : <div className="has-text-centered">
              Belum ada laporan praktikum yang telah dikumpulkan
            </div>
      }
    </>
  )
}

export default Submission