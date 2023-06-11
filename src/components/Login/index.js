import Cookies from 'js-cookie'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    isLoginFailure: false,
  }

  onSuccessLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    const {history} = this.props
    history.replace('/')
    this.setState({isLoginFailure: false})
  }

  onFailureLogin = errorMsg => {
    this.setState({errorMsg, isLoginFailure: true})
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.onFailureLogin(data.error_msg)
    }
  }

  onEnterUserInput = event => {
    this.setState({username: event.target.value})
  }

  onEnterPasswordInput = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, errorMsg, isLoginFailure} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <form
          className="login-form-container"
          onSubmit={this.onSubmitLoginForm}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-form-logo"
          />
          <div className="login-each-input-element-container">
            <label htmlFor="userNameInput" className="login-label-element">
              USERNAME
            </label>
            <input
              type="text"
              id="userNameInput"
              className="login-input-element"
              placeholder="Username"
              onChange={this.onEnterUserInput}
              value={username}
            />
          </div>
          <div className="login-each-input-element-container">
            <label htmlFor="userPasswordInput" className="login-label-element">
              PASSWORD
            </label>
            <input
              type="password"
              id="userPasswordInput"
              className="login-input-element"
              placeholder="Password"
              onChange={this.onEnterPasswordInput}
              value={password}
            />
          </div>
          <button type="submit" className="login-submit-button">
            Login
          </button>
          {isLoginFailure && <p className="login-error-msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default Login
