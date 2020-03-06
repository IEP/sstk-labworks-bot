import { useContext } from 'react'
import store from '../store'
import MahasiswaTableHead from './MahasiswaTableHead'
import MahasiswaTableRow from './MahasiswaTableRow'

const MahasiswaTable = () => {
  const { state } = useContext(store)
  const mahasiswa = state.mahasiswa.list
  return (
    <table className="table is-striped is-hoverable is-fullwidth">
      <MahasiswaTableHead />
      <tbody>
        {
          mahasiswa.map((item) => (
            <MahasiswaTableRow
              key={item.telegram_id}
              mahasiswa={item}
            />
          ))
        }
      </tbody>
    </table>
  )
}

export default MahasiswaTable