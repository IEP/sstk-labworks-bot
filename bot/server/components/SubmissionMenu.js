import { useContext } from 'react'
import store from '../store'

const SubmissionMenu = () => {
    const { state, dispatch } = useContext(store)
    const { deadline, submission } = state
    return(
      <aside className="menu">
        <p className="menu-label">
          Kode Praktikum
        </p>
        <ul className="menu-list">
          <li>
            <a 
              className={!submission.activeDeadline? "is-active": ""}
              onClick={() => dispatch({type: "SET_SHOW_DEADLINE", payload: ''})}
              >
                All
            </a>
          </li>
          {
            deadline.list.map((item, key) => {
              return (
                <li key={key}>
                  <a 
                    className={submission.activeDeadline === item.kode_praktikum ? "is-active": ""}
                    onClick={() => dispatch({type: "SET_SHOW_DEADLINE", payload: item.kode_praktikum})}
                    >
                    {item.kode_praktikum}
                  </a>
                </li>
              )
            })
          }
        </ul>
      </aside>
    )
}
export default SubmissionMenu