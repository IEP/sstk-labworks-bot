import { format, utcToZonedTime } from 'date-fns-tz'

const SubmissionTableRow = ({ submission }) => {
  const { telegram_id, email, kode_praktikum, filename, created_at } = submission
  const zoned_date = utcToZonedTime(
    created_at,
    'Asia/Jakarta'
  )
  const date = format(
    zoned_date,
    'dd MMMM yyyy HH:mm:ss',
    { timeZone: 'Asia/Jakarta' }
  )
  return (
    <tr>
      <td>{ kode_praktikum }</td>
      <td>{ telegram_id }</td>
      <td>{ email }</td>
      <td>{ filename }</td>
      <td>{ date }</td>
    </tr>
  )
}

export default SubmissionTableRow