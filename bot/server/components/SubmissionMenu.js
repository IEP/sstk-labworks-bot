import { useContext, useEffect } from 'react'
import store from '../store'
import axios from 'axios'
import lodash from 'lodash'

const SubmissionMenu = () => {
  const { state, dispatch } = useContext(store)
  const { deadline, submission, token } = state

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
  }, [])

  const groups = lodash
    .uniq(
      deadline.list.map(item => item.kode_praktikum.slice(0, -2))
    )
    .sort()
    .map(item => ({
      name: item,
      list: deadline.list
        .filter(i => i.kode_praktikum.slice(0, -2) === item)
        .sort((a, b) => {
          return (a.kode_praktikum < b.kode_praktikum) ? -1 : 1
        })
    }))
  
  // Fired when the user select from menu
  const fetchSubmission = async (kode_praktikum) => {
    const res = await axios.get('/api/submission', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        kode_praktikum
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
    dispatch({
      type: 'SET_SUBMISSION_ORDER_BY',
      payload: ''
    })
  }

  const updateList = async (payload) => {
    dispatch({
      type: 'SET_SHOW_DEADLINE',
      payload
    })
    dispatch({
      type: 'SET_SUBMISSION_PAGE',
      payload: 0
    })
    fetchSubmission(payload)
  }

  return (
    <aside className="menu">
      <ul className="menu-list">
        <li>
          <a 
            className={!submission.activeDeadline ? "is-active" : ""}
            onClick={() => updateList('')}
          >
            All
          </a>
        </li>
      </ul>
      {
        groups.map((group, key) => (
          <div key={key}>
            <hr/>
            <p className="menu-label">
              {group.name}
            </p>
            <ul className="menu-list">
              {
                group.list.map((item, key) => (
                  <li key={key}>
                    <a 
                      className={
                        submission.activeDeadline === item.kode_praktikum 
                          ? "is-active"
                          : ""
                      }
                      onClick={() => updateList(item.kode_praktikum)}
                    >
                      {item.kode_praktikum}
                    </a>
                  </li>
                ))
              }
            </ul>
          </div>
        ))
      }
    </aside>
  )
}

export default SubmissionMenu