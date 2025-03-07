import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import HomeTable from '../HomeTable'
import SearchFilterItems from '../SearchFilterItems'
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

class Home extends Component {
  state = {
    covidDataList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getCovidDataList()
  }

  getCovidDataList = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const response = await fetch('https://apis.ccbp.in/covid19-state-wise-data')
    if (response.ok === true) {
      const data = await response.json()
      const keyNames = Object.keys(data)
      const updatedList = []
      keyNames.forEach(keyName => {
        if (data[keyName]) {
          const {total} = data[keyName]
          const confirmed = total.confirmed ? total.confirmed : 0
          const deceased = total.deceased ? total.deceased : 0
          const recovered = total.recovered ? total.recovered : 0
          const tested = total.tested ? total.tested : 0
          const population = data[keyName].meta.population
            ? data[keyName].meta.population
            : 0
          updatedList.push({
            stateCode: keyName,
            name: statesList.find(state => state.state_code === keyName)
              .state_name,
            confirmed,
            deceased,
            recovered,
            tested,
            population,
            active: confirmed - (recovered + deceased),
          })
        }
      })
      this.setState({
        covidDataList: updatedList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  readUserSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onSortAscending = () => {
    const {covidDataList} = this.state
    const ascendingList = covidDataList.sort((a, b) => {
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      }
      return 0
    })
    this.setState({covidDataList: ascendingList})
  }

  onSortDescending = () => {
    const {covidDataList} = this.state
    const descendingList = covidDataList.sort((a, b) => {
      if (a.name > b.name) {
        return -1
      }
      if (a.name < b.name) {
        return 1
      }
      return 0
    })
    this.setState({covidDataList: descendingList})
  }

  renderSuccessView = () => {
    const {covidDataList, searchInput} = this.state
    const filteredList = statesList.filter(each =>
      each.state_name.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const totalConfirmed = covidDataList.reduce(
      (sum, item) => sum + item.confirmed,
      0,
    )
    const totalActive = covidDataList.reduce(
      (sum, item) => sum + item.active,
      0,
    )
    const totalRecovered = covidDataList.reduce(
      (sum, item) => sum + item.recovered,
      0,
    )
    const totalDeceased = covidDataList.reduce(
      (sum, item) => sum + item.deceased,
      0,
    )
    return (
      <div>
        {searchInput.length === 0 ? (
          <>
            <ul className="nation-wise-cards">
              <li className="card-list">
                <div
                  testid="countryWideConfirmedCases"
                  className="count-card card1"
                >
                  <p>Confirmed</p>
                  <img
                    src="https://res.cloudinary.com/dxi9xkgna/image/upload/v1740821266/check-mark_1_uqwcrq.png"
                    alt="country wide confirmed cases pic"
                  />
                  <p>{totalConfirmed}</p>
                </div>
              </li>
              <li className="card-list">
                <div
                  testid="countryWideActiveCases"
                  className="count-card card2"
                >
                  <p>Active</p>
                  <img
                    src="https://res.cloudinary.com/dxi9xkgna/image/upload/v1740821750/protection_1_l0vegg.png"
                    alt="country wide active cases pic"
                  />
                  <p>{totalActive}</p>
                </div>
              </li>
              <li className="card-list">
                <div
                  testid="countryWideRecoveredCases"
                  className="count-card card3"
                >
                  <p>Recovered</p>
                  <img
                    src="https://res.cloudinary.com/dxi9xkgna/image/upload/v1740821814/recovered_1_ykplcz.png"
                    alt="country wide recovered cases pic"
                  />
                  <p>{totalRecovered}</p>
                </div>
              </li>
              <li className="card-list">
                <div
                  testid="countryWideDeceasedCases"
                  className="count-card card4"
                >
                  <p>Deceased</p>
                  <img
                    src="https://res.cloudinary.com/dxi9xkgna/image/upload/v1740821871/breathing_1_rislje.png"
                    alt="country wide deceased cases pic"
                  />
                  <p>{totalDeceased}</p>
                </div>
              </li>
            </ul>
            <HomeTable
              covidDataList={covidDataList}
              onSortAscending={this.onSortAscending}
              onSortDescending={this.onSortDescending}
            />
          </>
        ) : (
          <ul
            className="search-filters-container"
            testid="searchResultsUnorderedList"
          >
            {filteredList.map(eachState => (
              <SearchFilterItems
                eachState={eachState}
                key={eachState.state_code}
              />
            ))}
          </ul>
        )}
      </div>
    )
  }

  renderFailureView = () => (
    <div>
      <p>FAILED TO FETCH DATA</p>
    </div>
  )

  renderLoadingView = () => (
    <div testid="homeRouteLoader" className="loader-container">
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
    const {searchInput} = this.state
    return (
      <div className="home-container">
        <ul className="header-list-container">
          <Header />
        </ul>
        <div className="home-inner-container">
          <div className="search-input-container">
            <BsSearch className="search-icon" />
            <input
              onChange={this.readUserSearch}
              value={searchInput}
              className="search-input"
              type="search"
              placeholder="Enter the State"
            />
          </div>
          {this.renderDifferentViews()}
        </div>
        <Footer />
      </div>
    )
  }
}
export default Home
