import { useContext } from 'react'
import store from '../store'
import lodash from 'lodash'
import MahasiswaTableHead from './MahasiswaTableHead'
import MahasiswaTableRow from './MahasiswaTableRow'

const MahasiswaTable = () => {
  const { state, dispatch } = useContext(store)
  const { mahasiswa } = state
  const show = state.mahasiswa.list
  const pageList = lodash
    .range(mahasiswa.page - 5, mahasiswa.page + 6)
    .filter((page) => 0 <= page && page <= mahasiswa.totalPages)

  const updatePage = async (page) => {
    if (0 <= page && page <= mahasiswa.totalPages) {
      dispatch({
        type: 'SET_MAHASISWA_PAGE',
        payload: page
      })
    }
  }

  const handleChangeSearch = (e) => {
    dispatch({
      type: 'SET_MAHASISWA_SEARCH',
      payload: e.target.value
    })
  }

  const handleDeleteSearch = () => {
    dispatch({
      type: 'SET_MAHASISWA_SEARCH',
      payload: ''
    })
  }

  return (
    <>
      <div
        style={{
          marginTop: 20,
          marginBottom: 20
        }}
      >
        <div className="columns">
          <div className="column is-2">
            <input
              className="input"
              placeholder="Cari"
              onChange={handleChangeSearch}
              value={mahasiswa.search}
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
            className="pagination-previous"
            onClick={() => updatePage(mahasiswa.page - 1)}
            disabled={mahasiswa.page <= 0}
          >
            Prev
          </a>
          <ul className="pagination-list">
            {pageList.map((page) => (
              <li key={page}>
                <a
                  className={
                    page === mahasiswa.page
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
            className="pagination-next"
            onClick={() => updatePage(mahasiswa.page + 1)}
            disabled={mahasiswa.page >= mahasiswa.totalPages}
          >
            Next
          </a>
        </nav>
      </div>
      <table className="table is-striped is-hoverable is-fullwidth">
        <MahasiswaTableHead />
        <tbody>
          {show.length > 0 ? (
            show.map((item) => (
              <MahasiswaTableRow key={item.telegram_id} mahasiswa={item} />
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
    </>
  )
}

export default MahasiswaTable
