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
            className="header-website-logo"
          />
        </Link>
        <ul className="header-navigation-button-container">
          <li>
            <Link to="/">
              <button type="button" className="each-header-navigation-button">
                <AiFillHome className="each-header-navigation-button" />
              </button>
            </Link>
          </li>
          <li>
            <Link to="/jobs">
              <button type="button" className="each-header-navigation-button">
                <BsBriefcaseFill className="each-header-navigation-button" />
              </button>
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="each-header-navigation-button"
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
            className="header-website-lg-logo"
          />
        </Link>
        <div className="header-navigation-button-lg-container">
          <Link to="/">
            <button type="button" className="each-header-navigation-lg-button">
              Home
            </button>
          </Link>
          <Link to="/jobs">
            <button type="button" className="each-header-navigation-lg-button">
              Jobs
            </button>
          </Link>
        </div>
        <button
          type="button"
          className="header-lg-logout-button"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </nav>
    </>
  )
}
export default withRouter(Header)
