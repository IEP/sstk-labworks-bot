import { useContext } from 'react'
import store from '../store'
import DeadlineTableHead from './DeadlineTableHead'
import DeadlineTableRow from './DeadlineTableRow'

const DeadlineTable = () => {
  const { state } = useContext(store)
  const { deadline } = state
  return (
    <table className="table is-striped is-hoverable is-fullwidth">
      <DeadlineTableHead />
      <tbody>
        {
          deadline.list.map((item) => (
            <DeadlineTableRow key={item.kode_praktikum} item={item} />
          ))
        }
      </tbody>
    </table>
  )
}

export default DeadlineTable