import {withRouter, Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <>
      <nav className="header-nav-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-website-logo each-nav-link-item"
          />
        </Link>
        <ul className="header-navigation-button-container">
          <li>
            <Link to="/" className="each-nav-link-item">
              <button
                type="button"
                className="each-header-navigation-button each-nav-link-item"
              >
                <AiFillHome className="each-header-navigation-button" />
              </button>
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="each-nav-link-item">
              <button type="button" className="each-header-navigation-button">
                <BsBriefcaseFill className="each-header-navigation-button" />
              </button>
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="each-header-navigation-button each-nav-link-item"
              onClick={onClickLogout}
            >
              <FiLogOut className="each-header-navigation-button" />
            </button>
          </li>
        </ul>
      </nav>
      <nav className="header-nav-lg-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-website-lg-logo each-nav-link-item"
          />
        </Link>
        <div className="header-navigation-button-lg-container">
          <Link to="/">
            <button
              type="button"
              className="each-header-navigation-lg-button each-nav-link-item"
            >
              Home
            </button>
          </Link>
          <Link to="/jobs">
            <button
              type="button"
              className="each-header-navigation-lg-button each-nav-link-item"
            >
              Jobs
            </button>
          </Link>
        </div>
        <button
          type="button"
          className="header-lg-logout-button each-nav-link-item"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </nav>
    </>
  )
}
export default withRouter(Header)
