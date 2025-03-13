import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from 'recharts'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'
import DistrictItems from '../DistrictItems'
import BarGraphItem from '../BarGraphItem'
import Footer from '../Footer'
import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
  {
    state_code: 'TT',
    state_name: 'Other',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const activeCardConstants = {
  confirmed: 'CONFIRMED',
  active: 'ACTIVE',
  recovered: 'RECOVERED',
  deceased: 'DECEASED',
}

class StateItemDetails extends Component {
  state = {
    stateDetails: [],
    timelineData: [],
    apiStatus: apiStatusConstants.initial,
    activeCard: activeCardConstants.confirmed,
    isLoading: false,
  }

  componentDidMount() {
    this.getStateDetails()
    this.getTimelineDetails()
  }

  getTimelineDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({isLoading: true})
    const response = await fetch(
      `https://apis.ccbp.in/covid19-timelines-data/${id}`,
    )
    if (response.ok === true) {
      const updatedData = await response.json()
      const keyNames = Object.keys(updatedData[id].dates)
      const datesList = []
      keyNames.forEach(date => {
        const confirmed = updatedData[id].dates[date].total.confirmed
          ? updatedData[id].dates[date].total.confirmed
          : 0
        const recovered = updatedData[id].dates[date].total.recovered
          ? updatedData[id].dates[date].total.recovered
          : 0
        const deceased = updatedData[id].dates[date].total.deceased
          ? updatedData[id].dates[date].total.deceased
          : 0
        const tested = updatedData[id].dates[date].total.tested
          ? updatedData[id].dates[date].total.tested
          : 0
        const active =
          (updatedData[id].dates[date].total.confirmed
            ? updatedData[id].dates[date].total.confirmed
            : 0) -
          ((updatedData[id].dates[date].total.recovered
            ? updatedData[id].dates[date].total.recovered
            : 0) +
            (updatedData[id].dates[date].total.deceased
              ? updatedData[id].dates[date].total.deceased
              : 0))
        datesList.push({
          date,
          confirmed,
          deceased,
          recovered,
          active,
          tested,
        })
      })
      this.setState({
        timelineData: datesList,
        isLoading: false,
      })
    }
  }

  getStateDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.loading})
    const options = {
      method: 'GET',
    }
    const apiUrl = `https://apis.ccbp.in/covid19-state-wise-data`
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const keyNames = Object.keys(data)
      keyNames.forEach(keyName => {
        if (keyName === id) {
          const {total} = data[keyName]
          const confirmed = total.confirmed ? total.confirmed : 0
          const deceased = total.deceased ? total.deceased : 0
          const recovered = total.recovered ? total.recovered : 0
          const tested = total.tested ? total.tested : 0
          const population = data[keyName].meta.population
            ? data[keyName].meta.population
            : 0
          const lastUpdated = data[keyName].meta.last_updated
            ? data[keyName].meta.last_updated
            : 0
          const updatedList = {
            stateCode: keyName,
            stateName: statesList.find(state => state.state_code === keyName)
              .state_name,
            confirmed,
            deceased,
            recovered,
            tested,
            population,
            lastUpdated,
            active: confirmed - (recovered + deceased),
            districtsObject: data[keyName].districts,
          }
          this.setState({
            stateDetails: updatedList,
            apiStatus: apiStatusConstants.success,
          })
        }
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderConfirmedView = () => {
    const {stateDetails} = this.state
    const {districtsObject} = stateDetails
    const confirmedCasesList = []
    const districtNames = Object.keys(districtsObject)
    districtNames.forEach(districtName => {
      if (districtsObject[districtName]) {
        const confirmedCases = districtsObject[districtName].total.confirmed
          ? districtsObject[districtName].total.confirmed
          : 0
        confirmedCasesList.push({
          districtCount: confirmedCases,
          districtName,
        })
      }
    })
    const sortedConfirmedCasesList = confirmedCasesList.sort(
      (a, b) => b.districtCount - a.districtCount,
    )
    return (
      <>
        {sortedConfirmedCasesList.map(eachCase => (
          <DistrictItems caseDetails={eachCase} key={eachCase.districtName} />
        ))}
      </>
    )
  }

  renderActiveView = () => {
    const {stateDetails} = this.state
    const {districtsObject} = stateDetails
    const activeCasesList = []
    const districtNames = Object.keys(districtsObject)
    districtNames.forEach(districtName => {
      if (districtsObject[districtName]) {
        const activeCases =
          (districtsObject[districtName].total.confirmed
            ? districtsObject[districtName].total.confirmed
            : 0) -
          ((districtsObject[districtName].total.recovered
            ? districtsObject[districtName].total.recovered
            : 0) +
            (districtsObject[districtName].total.deceased
              ? districtsObject[districtName].total.deceased
              : 0))
        activeCasesList.push({
          districtCount: activeCases,
          districtName,
        })
      }
    })
    const sortedActiveCasesList = activeCasesList.sort(
      (a, b) => b.districtCount - a.districtCount,
    )
    return (
      <>
        {sortedActiveCasesList.map(eachCase => (
          <DistrictItems caseDetails={eachCase} key={eachCase.districtName} />
        ))}
      </>
    )
  }

  renderRecoveredView = () => {
    const {stateDetails} = this.state
    const {districtsObject} = stateDetails
    const recoveredCasesList = []
    const districtNames = Object.keys(districtsObject)
    districtNames.forEach(districtName => {
      if (districtsObject[districtName]) {
        const recoveredCases = districtsObject[districtName].total.recovered
          ? districtsObject[districtName].total.recovered
          : 0
        recoveredCasesList.push({
          districtCount: recoveredCases,
          districtName,
        })
      }
    })
    const sortedRecoveredCasesList = recoveredCasesList.sort(
      (a, b) => b.districtCount - a.districtCount,
    )
    return (
      <>
        {sortedRecoveredCasesList.map(eachCase => (
          <DistrictItems caseDetails={eachCase} key={eachCase.districtName} />
        ))}
      </>
    )
  }

  renderDeceasedView = () => {
    const {stateDetails} = this.state
    const {districtsObject} = stateDetails
    const deceasedCasesList = []
    const districtNames = Object.keys(districtsObject)
    districtNames.forEach(districtName => {
      if (districtsObject[districtName]) {
        const deceasedCases = districtsObject[districtName].total.deceased
          ? districtsObject[districtName].total.deceased
          : 0
        deceasedCasesList.push({
          districtCount: deceasedCases,
          districtName,
        })
      }
    })
    const sortedDeceasedCasesList = deceasedCasesList.sort(
      (a, b) => b.districtCount - a.districtCount,
    )
    return (
      <>
        {sortedDeceasedCasesList.map(eachCase => (
          <DistrictItems caseDetails={eachCase} key={eachCase.districtName} />
        ))}
      </>
    )
  }

  renderDifferentStates = () => {
    const {activeCard} = this.state
    switch (activeCard) {
      case activeCardConstants.confirmed:
        return this.renderConfirmedView()
      case activeCardConstants.active:
        return this.renderActiveView()
      case activeCardConstants.recovered:
        return this.renderRecoveredView()
      case activeCardConstants.deceased:
        return this.renderDeceasedView()
      default:
        return null
    }
  }

  activateConfirmed = () => {
    this.setState({activeCard: activeCardConstants.confirmed})
  }

  activateActived = () => {
    this.setState({activeCard: activeCardConstants.active})
  }

  activateRecovered = () => {
    this.setState({activeCard: activeCardConstants.recovered})
  }

  activateDeceased = () => {
    this.setState({activeCard: activeCardConstants.deceased})
  }

  renderSuccessView = () => {
    const {stateDetails, activeCard, timelineData, isLoading} = this.state
    const {
      stateName,
      confirmed,
      deceased,
      recovered,
      tested,
      lastUpdated,
      active,
    } = stateDetails
    return (
      <div>
        <div className="state-top-container">
          <div>
            <h1 className="states-name">{stateName}</h1>
            <p className="state-last-update">Last update on {lastUpdated}</p>
          </div>
          <div>
            <p className="state-tests">Tested</p>
            <p className="state-tests">{tested}</p>
          </div>
        </div>
        <div className="state-wise-cards">
          <button onClick={this.activateConfirmed} type="button">
            <div
              testid="stateSpecificConfirmedCasesContainer"
              className={`state-count-card state-card1 ${
                activeCard === activeCardConstants.confirmed
                  ? 'active-confirmed'
                  : ''
              }`}
            >
              <p>Confirmed</p>
              <img
                src="https://res.cloudinary.com/dxi9xkgna/image/upload/v1740821266/check-mark_1_uqwcrq.png"
                alt="state specific confirmed cases pic"
              />
              <p>{confirmed}</p>
            </div>
          </button>
          <button onClick={this.activateActived} type="button">
            <div
              testid="stateSpecificActiveCasesContainer"
              className={`state-count-card state-card2 ${
                activeCard === activeCardConstants.active ? 'active-active' : ''
              }`}
            >
              <p>Active</p>
              <img
                src="https://res.cloudinary.com/dxi9xkgna/image/upload/v1740821750/protection_1_l0vegg.png"
                alt="state specific active cases pic"
              />
              <p>{active}</p>
            </div>
          </button>
          <button onClick={this.activateRecovered} type="button">
            <div
              testid="stateSpecificRecoveredCasesContainer"
              className={`state-count-card state-card3 ${
                activeCard === activeCardConstants.recovered
                  ? 'active-recovered'
                  : ''
              }`}
            >
              <p>Recovered</p>
              <img
                src="https://res.cloudinary.com/dxi9xkgna/image/upload/v1740821814/recovered_1_ykplcz.png"
                alt="state specific recovered cases pic"
              />
              <p>{recovered}</p>
            </div>
          </button>
          <button onClick={this.activateDeceased} type="button">
            <div
              testid="stateSpecificDeceasedCasesContainer"
              className={`state-count-card state-card4 ${
                activeCard === activeCardConstants.deceased
                  ? 'active-deceased'
                  : ''
              }`}
            >
              <p>Deceased</p>
              <img
                src="https://res.cloudinary.com/dxi9xkgna/image/upload/v1740821871/breathing_1_rislje.png"
                alt="state specific deceased cases pic"
              />
              <p>{deceased}</p>
            </div>
          </button>
        </div>
        <div>
          <h1
            className={`all-header ${
              activeCard === activeCardConstants.confirmed && 'confirmed-header'
            }
            ${activeCard === activeCardConstants.active && 'active-header'}
            ${
              activeCard === activeCardConstants.recovered && 'recovered-header'
            }
            ${
              activeCard === activeCardConstants.deceased && 'deceased-header'
            }`}
          >
            Top Districts
          </h1>
          <ul
            className="top-districts-container"
            testid="topDistrictsUnorderedList"
          >
            {this.renderDifferentStates()}
          </ul>
          <div>
            {isLoading ? (
              <div testid="timelinesDataLoader" className="loader-container">
                <Loader type="TailSpin" color="#007BFF" />
              </div>
            ) : (
              <BarGraphItem
                activeCard={activeCard}
                timelineData={timelineData}
              />
            )}
          </div>
          <div className="spread-trend-container">
            <h1 className="trends">Daily Spread Trends</h1>
            <div testid="lineChartsContainer">
              <div className="confirmed-container">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={timelineData}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}
                  >
                    <XAxis
                      dataKey="date"
                      tick={{fill: '#FF073A'}}
                      tickLine={false}
                      axisLine={{stroke: '#FF073A'}}
                    />
                    <YAxis
                      tick={{fill: '#FF073A'}}
                      axisLine={{stroke: '#FF073A'}}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        color: '#FF073A',
                        borderRadius: 8,
                      }}
                      itemStyle={{color: '#FF073A'}}
                    />
                    <Legend
                      align="right"
                      verticalAlign="top"
                      iconType="circle"
                      wrapperStyle={{color: '#FF073A'}}
                    />
                    <Line
                      type="monotone"
                      dataKey="confirmed"
                      stroke="#FF073A"
                      strokeWidth={2}
                      dot={{fill: '#FF073A', r: 4}}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="active-container">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={timelineData}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}
                  >
                    <XAxis
                      dataKey="date"
                      tick={{fill: '#007BFF'}}
                      tickLine={false}
                      axisLine={{stroke: '#007BFF'}}
                    />
                    <YAxis
                      tick={{fill: '#007BFF'}}
                      axisLine={{stroke: '#007BFF'}}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        color: '#007BFF',
                        borderRadius: 8,
                      }}
                      itemStyle={{color: '#007BFF'}}
                    />
                    <Legend
                      align="right"
                      verticalAlign="top"
                      iconType="circle"
                      wrapperStyle={{color: '#007BFF'}}
                    />
                    <Line
                      type="monotone"
                      dataKey="active"
                      stroke="#007BFF"
                      strokeWidth={2}
                      dot={{fill: '#007BFF', r: 4}}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="recovered-container">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={timelineData}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}
                  >
                    <XAxis
                      dataKey="date"
                      tick={{fill: '#27A243'}}
                      tickLine={false}
                      axisLine={{stroke: '#27A243'}}
                    />
                    <YAxis
                      tick={{fill: '#27A243'}}
                      axisLine={{stroke: '#27A243'}}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        color: '#27A243',
                        borderRadius: 8,
                      }}
                      itemStyle={{color: '#27A243'}}
                    />
                    <Legend
                      align="right"
                      verticalAlign="top"
                      iconType="circle"
                      wrapperStyle={{color: '#27A243'}}
                    />
                    <Line
                      type="monotone"
                      dataKey="recovered"
                      stroke="#27A243"
                      strokeWidth={2}
                      dot={{fill: '#27A243', r: 4}}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="deceased-container">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={timelineData}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}
                  >
                    <XAxis
                      dataKey="date"
                      tick={{fill: '#6C757D'}}
                      tickLine={false}
                      axisLine={{stroke: '#6C757D'}}
                    />
                    <YAxis
                      tick={{fill: '#6C757D'}}
                      axisLine={{stroke: '#6C757D'}}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        color: '#6C757D',
                        borderRadius: 8,
                      }}
                      itemStyle={{color: '#6C757D'}}
                    />
                    <Legend
                      align="right"
                      verticalAlign="top"
                      iconType="circle"
                      wrapperStyle={{color: '#6C757D'}}
                    />
                    <Line
                      type="monotone"
                      dataKey="deceased"
                      stroke="#6C757D"
                      strokeWidth={2}
                      dot={{fill: '#6C757D', r: 4}}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="tested-container">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={timelineData}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}
                  >
                    <XAxis
                      dataKey="date"
                      tick={{fill: '#9673B9'}}
                      tickLine={false}
                      axisLine={{stroke: '#9673B9'}}
                    />
                    <YAxis
                      tick={{fill: '#9673B9'}}
                      axisLine={{stroke: '#9673B9'}}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        color: '#9673B9',
                        borderRadius: 8,
                      }}
                      itemStyle={{color: '#9673B9'}}
                    />
                    <Legend
                      align="right"
                      verticalAlign="top"
                      iconType="circle"
                      wrapperStyle={{color: '#9673B9'}}
                    />
                    <Line
                      type="monotone"
                      dataKey="tested"
                      stroke="#9673B9"
                      strokeWidth={2}
                      dot={{fill: '#9673B9', r: 4}}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div>
      <p>FAILED TO FETCH DATA</p>
    </div>
  )

  renderLoadingView = () => (
    <div testid="stateDetailsLoader" className="loader-container">
      <Loader type="TailSpin" color="#007BFF" />
    </div>
  )

  renderDifferentViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="state-specific-container">
        <ul className="header-list-container">
          <Header />
        </ul>
        {this.renderDifferentViews()}
        <Footer />
      </div>
    )
  }
}
export default StateItemDetails
