import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {BiLinkExternal} from 'react-icons/bi'
import Header from '../Header'
import SkillsItem from '../SkillsItem'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

const constApiStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemFullDetails extends Component {
  state = {
    jobCompleteDetails: {},
    apiStatus: constApiStatus.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  onClickRetryButton = () => this.getJobDetails()

  getJobDetails = async () => {
    this.setState({apiStatus: constApiStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const parsedData = {
        id: data.job_details.id,
        companyLogoUrl: data.job_details.company_logo_url,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        companyWebsiteUrl: data.job_details.company_website_url,
        lifeAtCompanyDescription: data.job_details.life_at_company.description,
        lifeAtCompanyImageUrl: data.job_details.life_at_company.image_url,
        skills: data.job_details.skills,
        similarJobs: data.similar_jobs,
      }
      this.setState({
        jobCompleteDetails: parsedData,
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

  renderFailureView = () => (
    <div className="job-item-full-details-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-item-full-details-failure-view-image"
      />
      <h1 className="job-item-full-details-failure-view-heading">
        Oops! Something Went Wrong
      </h1>
      <p className="job-item-full-details-location">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="home-find-jobs-button"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {jobCompleteDetails} = this.state
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      companyWebsiteUrl,
      lifeAtCompanyDescription,
      lifeAtCompanyImageUrl,
      skills,
      similarJobs,
    } = jobCompleteDetails
    return (
      <div>
        <div className="job-item-full-details-list-item-container">
          <div className="job-item-full-details-logo-and-info">
            <img
              src={companyLogoUrl}
              alt=" job details company logo"
              className="job-item-full-details-list-item-company-logo"
            />
            <div className="job-item-full-details-title-rating-container">
              <h1 className="job-item-full-details-job-title">{title}</h1>
              <div className="job-item-full-details-rating-container">
                <BsStarFill color="#fbbf24" />
                <p className="job-item-full-details-rating">{rating}</p>
              </div>
            </div>
          </div>

          <div className="job-item-full-details-location-package-type-container">
            <div className="job-item-full-details-location-type-container">
              <div className="job-item-full-details-rating-container">
                <MdLocationOn color="#ffffff" size={20} />
                <p className="job-item-full-details-location">{location}</p>
              </div>
              <div className="job-item-full-details-rating-container">
                <BsBriefcaseFill color="#ffffff" size={20} />
                <p className="job-item-full-details-location">
                  {employmentType}
                </p>
              </div>
            </div>
            <p className="job-item-full-details-package">{packagePerAnnum}</p>
          </div>

          <hr className="horizontal-rule-all-job" />
          <div className="job-item-full-details-description-container">
            <div className="job-item-full-details-description-website-container">
              <h1 className="job-item-full-details-description-head">
                Description
              </h1>
              <a
                href={companyWebsiteUrl}
                className="job-item-full-details-description-company-website-url"
                target="_blank"
                rel="noreferrer"
              >
                <p>Visit</p>
                <BiLinkExternal />
              </a>
            </div>
            <p className="job-item-full-details-description-text">
              {jobDescription}
            </p>
          </div>

          <h1 className="job-item-full-details-description-head">Skills</h1>
          <ul className="job-item-full-details-skills-list-container">
            {skills.map(eachSkill => (
              <SkillsItem skillsList={eachSkill} key={eachSkill.name} />
            ))}
          </ul>

          <h1 className="job-item-full-details-description-head">
            Life at Company
          </h1>
          <div className="job-item-full-details-company-info">
            <p className="job-item-full-details-company-info-description">
              {lifeAtCompanyDescription}
            </p>
            <img
              src={lifeAtCompanyImageUrl}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list-container">
          {similarJobs.map(eachJob => (
            <SimilarJobItem similarJobs={eachJob} key={eachJob.id} />
          ))}
        </ul>
      </div>
    )
  }

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
      <>
        <Header />
        <div className="job-item-full-details-container">
          {this.renderResults()}
        </div>
      </>
    )
  }
}
export default JobItemFullDetails
