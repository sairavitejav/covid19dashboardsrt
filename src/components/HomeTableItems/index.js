import {Link} from 'react-router-dom'
import './index.css'

const HomeTableItems = props => {
  const {eachState} = props
  const {stateCode} = eachState
  const {name, confirmed, active, recovered, deceased, population} = eachState
  return (
    <Link className="links-each" to={`/state/${stateCode}`}>
      <li className="states-list-container">
        <div>
          <p className="state-name">{name}</p>
        </div>
        <div className="counts-containers">
          <p className="confirmed">{confirmed}</p>
        </div>
        <div className="counts-containers">
          <p className="active">{active}</p>
        </div>
        <div className="counts-containers">
          <p className="recovered">{recovered}</p>
        </div>
        <div className="counts-containers">
          <p className="deceased">{deceased}</p>
        </div>
        <div className="counts-containers">
          <p className="population">{population}</p>
        </div>
      </li>
    </Link>
  )
}
export default HomeTableItems
