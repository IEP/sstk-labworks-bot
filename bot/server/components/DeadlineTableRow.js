import { useContext } from 'react'
import store from '../store'
import axios from 'axios'
import { format, utcToZonedTime } from 'date-fns-tz'

const DeadlineTableRow = ({ item }) => {
  const { kode_praktikum, start, end } = item
  const { state, dispatch } = useContext(store)
  const { token } = state
  const zoned_start = utcToZonedTime(
    start,
    'Asia/Jakarta'
  )
  const zoned_end = utcToZonedTime(
    end,
    'Asia/Jakarta'
  )
  const str_start = format(
    zoned_start,
    'dd MMMM yyyy HH:mm:ss',
    { timeZone: 'Asia/Jakarta' }
  )
  const str_end = format(
    zoned_end,
    'dd MMMM yyyy HH:mm:ss',
    { timeZone: 'Asia/Jakarta' }
  )

  const handleClick = () => {
    axios.post('/api/deadline/delete', {
      kode_praktikum
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    dispatch({
      type: 'SET_DEADLINE_UPDATED',
      payload: new Date()
    })
  }

  return (
    <tr>
      <td>{ kode_praktikum }</td>
      <td>{ str_start }</td>
      <td>{ str_end }</td>
      <td>
        <div className="buttons">
          {/* Ubah: only allow to readjust start and end date */}
          {/* <button
            className="button is-primary"
            disabled
          >
            Ubah
          </button> */}
          <button
            className="button is-danger"
            onClick={() => handleClick()}
          >
            Hapus
          </button>
        </div>
      </td>
    </tr>
  )
}

export default DeadlineTableRow