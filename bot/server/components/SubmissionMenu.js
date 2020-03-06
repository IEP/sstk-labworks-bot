import { useContext } from 'react'
import store from '../store'

const SubmissionMenu = () => {
    const { state, dispatch } = useContext(store)
    const { deadline, submission } = state
    const groups = deadline.list
                  .map(item => item.kode_praktikum.slice(0, -2))
                  .filter((v, i, a) => a.indexOf(v) === i)
                  .map(item => ({
                    name: item,
                    list: deadline.list.filter(i => i.kode_praktikum.slice(0, -2) === item)
                  }))
    return(
      <aside className="menu">
        <ul className="menu-list">
          <li>
            <a 
              className={!submission.activeDeadline ? "is-active" : ""}
              onClick={() => dispatch({type: "SET_SHOW_DEADLINE", payload: ''})}
              >
                All
            </a>
          </li>
        </ul>
        {
          groups.map((group, key) => {
            return (
              <div key={key}>
              <hr/>
              <p className="menu-label">
                {group.name}
              </p>
              <ul className="menu-list">
                {
                  group.list.map((item, key) => {
                    return (
                      <li key={key}>
                        <a 
                          className={submission.activeDeadline === item.kode_praktikum ? "is-active" : ""}
                          onClick={() => dispatch({type: "SET_SHOW_DEADLINE", payload: item.kode_praktikum})}
                          >
                          {item.kode_praktikum}
                        </a>
                      </li>
                    )
                  })
                }
              </ul>
              </div>
            )
          })
        }
      </aside>
    )
}
export default SubmissionMenu