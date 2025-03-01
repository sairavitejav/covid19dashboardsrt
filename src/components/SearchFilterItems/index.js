import {Link} from 'react-router-dom'
import {BiChevronRightSquare} from 'react-icons/bi'
import './index.css'

const SearchFilterItems = props => {
  const {eachState} = props
  return (
    <Link to={`/state/${eachState.state_code}`} className="search-link">
      <li className="states-list-cont">
        <div>
          <p className="search-state-name">{eachState.state_name}</p>
        </div>
        <div className="search-state-container">
          <p className="search-state-code">{eachState.state_code}</p>
          <BiChevronRightSquare className="search-link-icon" />
        </div>
      </li>
    </Link>
  )
}
export default SearchFilterItems
