import { useContext } from 'react'
import store from '../store'
import SubmissionTableHead from './SubmissionTableHead'
import SubmissionTableRow from './SubmissionTableRow'

const SubmissionTable = () => {
  const { state } = useContext(store)
  const { submission } = state
  return (
    <table className="table is-striped is-hoverable is-fullwidth">
      <SubmissionTableHead />
      <tbody>
        {
          submission.list.map((item) => (
            <SubmissionTableRow
              key={item.id}
              submission={item}
            />
          ))
        }
      </tbody>
    </table>
  )
}

export default SubmissionTable