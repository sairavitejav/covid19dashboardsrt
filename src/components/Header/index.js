import {Link} from 'react-router-dom'
import './index.css'

export default function Header() {
  return (
    <nav className="nav-container">
      <div>
        <Link to="/">
          <img
            className="header-logo"
            src="https://res.cloudinary.com/dxi9xkgna/image/upload/v1740809526/COVID19INDIA_vgtlch.png"
            alt="website logo"
          />
        </Link>
      </div>
      <div className="header-links-container">
        <Link className="links" to="/">
          <p className="header-link">Home</p>
        </Link>
        <Link className="links" to="/about">
          <p className="header-link">About</p>
        </Link>
      </div>
    </nav>
  )
}
