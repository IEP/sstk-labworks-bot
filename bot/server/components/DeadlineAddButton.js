import { useContext } from 'react'
import store from '../store'

const DeadlineAddButton = () => {
  const { dispatch } = useContext(store)
  return (
    <div className="buttons has-addons">
      <button
        className="button is-primary"
        onClick={() => dispatch({
          type: 'SET_DEADLINE_MODAL',
          payload: true
        })}
      >
        Tambah Deadline
      </button>
    </div>
  )
}

export default DeadlineAddButton