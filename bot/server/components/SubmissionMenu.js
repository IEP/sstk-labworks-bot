import { useContext } from 'react'
import store from '../store'
import axios from 'axios'

const SubmissionMenu = () => {
  const { state, dispatch } = useContext(store)
  const { deadline, submission, token } = state
  const groups = deadline.list
    .map(item => item.kode_praktikum.slice(0, -2))
    .filter((v, i, a) => a.indexOf(v) === i)
    .map(item => ({
      name: item,
      list: deadline.list
        .filter(i =>
          i.kode_praktikum.slice(0, -2) === item
        )
        .sort((a, b) => {
          if (a.kode_praktikum < b.kode_praktikum) {
            return -1
          }
          return 1
        })
    }))
  
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
        groups.sort().map((group, key) => (
          <div key={key}>
            <hr/>
            <p className="menu-label">
              {group.name}
            </p>
            <ul className="menu-list">
              {
                group.list.sort().map((item, key) => (
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