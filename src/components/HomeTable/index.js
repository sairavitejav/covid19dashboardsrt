import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import HomeTableItems from '../HomeTableItems'
import './index.css'

const HomeTable = props => {
  const {covidDataList, onSortAscending, onSortDescending} = props
  const ascendingSort = () => {
    onSortAscending()
  }
  const descendingSort = () => {
    onSortDescending()
  }
  return (
    <div className="table-container" testid="stateWiseCovidDataTable">
      <div className="table-headers-container">
        <div className="order-icons-container">
          <p className="table-header">States/UT</p>
          <button
            testid="ascendingSort"
            onClick={ascendingSort}
            className="sort-buttons"
            type="button"
          >
            <FcGenericSortingAsc className="order-icons" />
          </button>
          <button
            testid="descendingSort"
            onClick={descendingSort}
            className="sort-buttons"
            type="button"
          >
            <FcGenericSortingDesc className="order-icons" />
          </button>
        </div>
        <div>
          <p className="table-header1">Confirmed</p>
        </div>
        <div>
          <p className="table-header1">Active</p>
        </div>
        <div>
          <p className="table-header1">Recovered</p>
        </div>
        <div>
          <p className="table-header1">Deceased</p>
        </div>
        <div>
          <p className="table-header1">Population</p>
        </div>
      </div>
      <ul className="states-container">
        {covidDataList.map(eachState => (
          <HomeTableItems eachState={eachState} key={eachState.stateCode} />
        ))}
      </ul>
    </div>
  )
}
export default HomeTable
