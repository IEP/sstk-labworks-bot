import { useContext } from 'react'
import store from '../store'
import SubmissionTableHead from './SubmissionTableHead'
import SubmissionTableRow from './SubmissionTableRow'
import SubmissionMenu from './SubmissionMenu'

const SubmissionTable = () => {
  const { state } = useContext(store)
  const { submission } = state
  const show = submission.list
    .filter(item =>
      item.kode_praktikum ==
        submission.activeDeadline || !submission.activeDeadline
    )
  return (
    <div className="columns">
      <div className="column is-one-fifth">
        <SubmissionMenu />
      </div>
      <div className="column">
        <table className="table is-striped is-hoverable is-fullwidth">
          <SubmissionTableHead />
          <tbody>
            {
              show.map((item) => (
                <SubmissionTableRow
                  key={item.id}
                  submission={item}
                />
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SubmissionTable