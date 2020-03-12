import { useContext } from 'react'
import store from '../store'

const MahasiswaTableHead = () => {
  const { state, dispatch } = useContext(store)
  const { mahasiswa } = state
  const currentOrder = mahasiswa.orderBy || 'email'

  const handleClick = (column) => {
    dispatch({
      type: 'SET_MAHASISWA_ORDER_BY',
      payload: column
    })
  }

  return (
    <thead>
      <tr>
        <th>Telegram ID</th>
        <th>
          <a
            className={
              currentOrder === 'email' ? 'has-text-success' : 'has-text-black'
            }
            onClick={() => handleClick('email')}
          >
            Alamat Surat Elektronik
          </a>
        </th>
        <th>
          <a
            className={
              currentOrder === 'created_at'
                ? 'has-text-success'
                : 'has-text-black'
            }
            onClick={() => handleClick('created_at')}
          >
            Tanggal Registrasi
          </a>
        </th>
        <th>Aksi</th>
      </tr>
    </thead>
  )
}

export default MahasiswaTableHead
