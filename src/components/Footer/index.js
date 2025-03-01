import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'
import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <img
        className="footer-logo"
        src="https://res.cloudinary.com/dxi9xkgna/image/upload/v1740809526/COVID19INDIA_vgtlch.png"
        alt="website logo"
      />
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
