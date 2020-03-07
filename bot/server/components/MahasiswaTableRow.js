import { useContext } from 'react'
import store from '../store'
import axios from 'axios'
import { format, utcToZonedTime } from 'date-fns-tz'

const MahasiswaTableRow = ({ mahasiswa }) => {
  const { telegram_id, email, created_at } = mahasiswa
  const { state, dispatch } = useContext(store)
  const { token } = state
  const zoned_date = utcToZonedTime(
    created_at,
    'Asia/Jakarta'
  )
  const date = format(
    zoned_date,
    'dd MMMM yyyy HH:mm:ss',
    { timeZone: 'Asia/Jakarta' }
  )

  const handleClick = () => {
    axios.post('/api/mahasiswa/delete', {
      telegram_id
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    dispatch({
      type: 'SET_MAHASISWA_UPDATED',
      payload: new Date()
    })
  }
  
  return (
    <tr>
      <td>{ telegram_id }</td>
      <td>{ email }</td>
      <td>{ date }</td>
      <td>
        <button
          className="button is-danger"
          onClick={() => handleClick()}
        >
          Bebas Lab
        </button>
      </td>
    </tr>
  )
}

export default MahasiswaTableRow