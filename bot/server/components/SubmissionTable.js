import { useContext } from 'react'
import store from '../store'
import SubmissionTableHead from './SubmissionTableHead'
import SubmissionTableRow from './SubmissionTableRow'
import SubmissionMenu from './SubmissionMenu'
import lodash from 'lodash'

const SubmissionTable = () => {
  const { state, dispatch } = useContext(store)
  const { submission } = state
  const show = submission.list

  const pageList = lodash
    .range(submission.page - 5, submission.page + 6)
    .filter((page) => 0 <= page && page <= submission.totalPages)

  const updatePage = async (page) => {
    if (0 <= page && page <= submission.totalPages) {
      dispatch({
        type: 'SET_SUBMISSION_PAGE',
        payload: page
      })
    }
  }

  const handleChangeSearch = (e) => {
    dispatch({
      type: 'SET_SUBMISSION_SEARCH',
      payload: e.target.value
    })
  }

  const handleDeleteSearch = () => {
    dispatch({
      type: 'SET_SUBMISSION_SEARCH',
      payload: ''
    })
  }

  return (
    <div className="columns">
      <div className="column is-3">
        <SubmissionMenu />
      </div>
      <div className="column">
        <div
          style={{
            marginTop: 20,
            marginBottom: 20
          }}
        >
          <div style={{ marginBottom: 10 }} className="columns">
            <div className="column is-3">
              <input
                className="input"
                placeholder="Cari"
                onChange={handleChangeSearch}
                value={submission.search}
              />
            </div>
            <div className="column">
              <button className="button" onClick={() => handleDeleteSearch()}>
                Hapus
              </button>
            </div>
          </div>
          <nav className="pagination is-centered is-small">
            <a
              onClick={() => updatePage(submission.page - 1)}
              className="pagination-previous"
              disabled={submission.page <= 0}
            >
              Prev
            </a>
            <ul className="pagination-list">
              {pageList.map((page) => (
                <li key={page}>
                  <a
                    className={
                      page === submission.page
                        ? 'pagination-link is-current'
                        : 'pagination-link'
                    }
                    onClick={() => updatePage(page)}
                  >
                    {page + 1}
                  </a>
                </li>
              ))}
            </ul>
            <a
              onClick={() => updatePage(submission.page + 1)}
              className="pagination-next"
              disabled={submission.page >= submission.totalPages}
            >
              Next
            </a>
          </nav>
        </div>
        <table className="table is-striped is-hoverable is-fullwidth">
          <SubmissionTableHead />
          <tbody>
            {show.length ? (
              show.map((item) => (
                <SubmissionTableRow key={item.id} submission={item} />
              ))
            ) : (
              <tr>
                <td colSpan="3" className="has-text-centered">
                  Kosong
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SubmissionTable
