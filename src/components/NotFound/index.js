import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      className="not-found-image"
      src="https://res.cloudinary.com/dxi9xkgna/image/upload/v1740809243/Group_7484_fjxzjr.png"
      alt="not-found-pic"
    />
    <h1 className="not-found-header">PAGE NOT FOUND</h1>
    <p className="not-found-desc">
      we are sorry, the page you requested could not be found Please go back to
      the homepage
    </p>
    <Link to="/">
      <button type="button" className="not-found-btn">
        Home
      </button>
    </Link>
  </div>
)
export default NotFound
