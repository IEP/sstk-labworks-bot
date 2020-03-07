import { useContext } from 'react'
import store from '../store'
import SubmissionTableHead from './SubmissionTableHead'
import SubmissionTableRow from './SubmissionTableRow'
import SubmissionMenu from './SubmissionMenu'
import axios from 'axios'

const SubmissionTable = () => {
  const { state, dispatch } = useContext(store)
  const { submission, token } = state
  const show = submission.list

  const updatePage = async (page) => {
    dispatch({
      type: "SET_SUBMISSION_PAGE",
      payload: page
    })
    const res = await axios.get('/api/submission', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        kode_praktikum: submission.activeDeadline,
        page
      }
    })
    dispatch({
      type: 'SET_SUBMISSION',
      payload: res.data
    })
  }

  return (
    <div className="columns">
      <div className="column is-2">
        <SubmissionMenu />
      </div>
      <div className="column">
        <div style={{
          marginTop: 20,
          marginBottom: 20
        }}>
        {
          (submission.page > 0) 
          ? <button
              onClick={async () => updatePage(submission.page - 1)} 
              className="button is-primary is-rounded m3 is-pulled-left"
              >
                Prev
              </button>
          : ""
        }
        {
          (submission.list.length)
          ? <button 
              onClick={async () => updatePage(submission.page + 1)}
              className="button is-primary is-rounded m3 is-pulled-right"
              >
                Next
              </button>
          : ""
        }
        </div>
        <table className="table is-striped is-hoverable is-fullwidth">
          <SubmissionTableHead />
          <tbody>
            { (show.length)
              ? show.map((item) => (
                  <SubmissionTableRow
                    key={item.id}
                    submission={item}
                  />
                ))
              : <tr>
                  <td colSpan="5" className="has-text-centered">
                    {(submission.page) ? "Selesai" : "Belum ada yang submit"}
                    </td>
                </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SubmissionTable