import { useContext } from 'react'
import store from '../store'

const SubmissionTableHead = () => {
  const { state, dispatch } = useContext(store)
  const { submission } = state
  const currentOrder = submission.orderBy || 'email'

  const handleClick = (column) => {
    dispatch({
      type: 'SET_SUBMISSION_ORDER_BY',
      payload: column
    })
  }

  return (
    <thead>
      <tr>
        <th>Kode Praktikum</th>
        <th>
          <a
            className={currentOrder === 'email' ? 'has-text-success' : 'has-text-black' }
            onClick={() => handleClick('email')}
          >
            Alamat Surat Elektronik
          </a>
        </th>
        <th>
          <a
            className={currentOrder === 'created_at' ? 'has-text-success' : 'has-text-black' }
            onClick={() => handleClick('created_at')}
          >
            Tanggal Pengumpulan
          </a>
        </th>
      </tr>
    </thead>
  )
}

export default SubmissionTableHead