import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'
import Footer from '../Footer'
import FaqItem from '../FaqItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Home extends Component {
  state = {faqsData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getFaqsData()
  }

  getFaqsData = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const response = await fetch('https://apis.ccbp.in/covid19-faqs')
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.faq.map(each => ({
        qno: each.qno,
        question: each.question,
        answer: each.answer,
        category: each.category,
      }))
      this.setState({
        faqsData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {faqsData} = this.state
    return (
      <div className="about-inner-container">
        <h1 className="about-header">About</h1>
        <p className="about-line1">Last update on march 28th 2021</p>
        <p className="about-line2">
          COVID-19 vaccines be ready for distribution
        </p>
        <ul testid="faqsUnorderedList" className="about-question-cont">
          {faqsData.map(eachData => (
            <FaqItem eachData={eachData} key={eachData.qno} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div>
      <p>FAILED TO FETCH DATA</p>
    </div>
  )

  renderLoadingView = () => (
    <div testid="aboutRouteLoader" className="loader-container">
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
      <div className="about-container">
        <ul className="about-list-container">
          <Header />
        </ul>
        {this.renderDifferentViews()}
        <Footer />
      </div>
    )
  }
}
export default Home
