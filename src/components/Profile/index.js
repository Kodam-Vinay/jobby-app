import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const constApiStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
class Profile extends Component {
  state = {
    profileData: {},
    apiStatus: constApiStatus.initial,
  }

  componentDidMount() {
    this.getProfileData()
  }

  onClickRetryButton = () => {
    this.getProfileData()
  }

  getProfileData = async () => {
    this.setState({apiStatus: constApiStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const parsedData = await response.json()
      const profileDetails = {
        name: parsedData.profile_details.name,
        profileImageUrl: parsedData.profile_details.profile_image_url,
        shortBio: parsedData.profile_details.short_bio,
      }
      this.setState({
        profileData: profileDetails,
        apiStatus: constApiStatus.success,
      })
    } else {
      this.setState({apiStatus: constApiStatus.failure})
    }
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    return (
      <div className="profile-success-div-container">
        <img src={profileImageUrl} alt="profile" className="profile-logo" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="profile-failure-view-container">
      <button
        type="button"
        className="home-find-jobs-button"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderResults = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case constApiStatus.success:
        return this.renderSuccessView()
      case constApiStatus.inProgress:
        return this.renderLoaderView()
      case constApiStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="profile-div-container-results">
        {this.renderResults()}
        <hr className="horizontal-rule" />
      </div>
    )
  }
}
export default Profile
