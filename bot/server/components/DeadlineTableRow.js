import { useContext } from 'react'
import store from '../store'
import axios from 'axios'
import { format, utcToZonedTime } from 'date-fns-tz'

const DeadlineTableRow = ({ item }) => {
  const { kode_praktikum, start, end } = item
  const { state, dispatch } = useContext(store)
  const { token } = state

  const timeZone = 'Asia/Jakarta'
  const display_pattern = 'dd MMMM yyyy HH:mm:ss'
  const pattern = 'yyyy-MM-dd HH:mm:ss'

  const zoned_start = utcToZonedTime(
    start,
    timeZone
  )
  const zoned_end = utcToZonedTime(
    end,
    timeZone
  )
  const str_start = format(
    zoned_start,
    display_pattern,
    { timeZone }
  )
  const str_end = format(
    zoned_end,
    display_pattern,
    { timeZone }
  )

  const handleClickDelete = () => {
    dispatch({
      type: 'SET_DEADLINE_DELETE_MODAL',
      payload: kode_praktikum
    })
  }

  const formatted_start = format(
    zoned_start,
    pattern,
    { timeZone }
  )

  const formatted_end = format(
    zoned_end,
    pattern,
    { timeZone }
  )

  const handleClickUpdate = () => {
    dispatch({
      type: 'SET_DEADLINE_EDIT',
      payload: {
        kode_praktikum,
        start: formatted_start,
        end: formatted_end
      }
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
          <button
            className="button is-primary is-small"
            onClick={() => handleClickUpdate()}
          >
            Ubah
          </button>
          <button
            className="button is-danger is-small"
            onClick={() => handleClickDelete()}
          >
            Hapus
          </button>
        </div>
      </td>
    </tr>
  )
}

export default DeadlineTableRow