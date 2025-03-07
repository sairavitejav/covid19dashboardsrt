import './index.css'

const DistrictItems = props => {
  const {caseDetails} = props
  const {districtName, districtCount} = caseDetails
  return (
    <li className="counter-list-container">
      <p className="count">{districtCount}</p>
      <p className="counts-name">{districtName}</p>
    </li>
  )
}
export default DistrictItems
