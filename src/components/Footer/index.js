import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'
import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <p className="logo">
        COVID19<span className="special">INDIA</span>
      </p>
      <p className="footer-description">
        we stand with everyone fighting on the front lines
      </p>
      <div className="footer-logos">
        <VscGithubAlt className="footer-icons" />
        <FiInstagram className="footer-icons" />
        <FaTwitter className="footer-icons" />
      </div>
    </div>
  )
}
