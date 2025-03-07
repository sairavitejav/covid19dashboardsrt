import {NavLink, Link} from 'react-router-dom'
import './index.css'

export default function Header() {
  return (
    <nav className="nav-container">
      <li className="list">
        <Link to="/" className="link">
          <p className="logo">
            COVID19<span className="special">INDIA</span>
          </p>
        </Link>
      </li>
      <li className="header-links-container">
        <NavLink
          className={({isActive}) =>
            isActive ? 'header-link active' : 'header-link'
          }
          exact
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({isActive}) =>
            isActive ? 'header-link active' : 'header-link'
          }
          to="/about"
        >
          About
        </NavLink>
      </li>
    </nav>
  )
}
