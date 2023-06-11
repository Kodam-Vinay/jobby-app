import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import './index.css'
import Profile from '../Profile'
import Header from '../Header'
import JobDetailsListItem from '../JobDetailsListItem'

const constApiStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    apiStatus: constApiStatus.initial,
    jobDetails: [],
    searchInput: '',
    minSalary: '',
    employeeTypeList: [],
  }

  componentDidMount() {
    this.getJobDetailsList()
  }

  onClickRetryButton = () => {
    this.getJobDetailsList()
  }

  getJobDetailsList = async () => {
    this.setState({apiStatus: constApiStatus.inProgress})
    const {searchInput, minSalary, employeeTypeList} = this.state
    const joinEmployeeType = employeeTypeList.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${joinEmployeeType}&minimum_package=${minSalary}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const parsedData = data.jobs.map(eachJob => ({
        id: eachJob.id,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({jobDetails: parsedData, apiStatus: constApiStatus.success})
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
    <div className="job-section-details-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-section-details-failure-view-image"
      />
      <h1 className="job-section-details-failure-view-heading">
        Oops! Something Went Wrong
      </h1>
      <p className="job-section-details-failure-paragraph">
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
    const {jobDetails} = this.state
    return (
      <>
        {jobDetails.length === 0 ? (
          <div className="no-job-details-found-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="no-job-details-found-image"
            />
            <h1 className="no-job-details-found-heading">No Jobs Found</h1>
            <p className="no-job-details-found-desc">
              We could not find any jobs. Try other filters
            </p>
            <button
              type="button"
              className="home-find-jobs-button"
              onClick={this.onClickRetryButton}
            >
              Retry
            </button>
          </div>
        ) : (
          <ul className="job-details-list-container">
            {jobDetails.map(eachJob => (
              <JobDetailsListItem jobDetails={eachJob} key={eachJob.id} />
            ))}
          </ul>
        )}
      </>
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

  onEnterSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onPressEnterKey = event => {
    if (event.key === 'Enter') {
      this.getJobDetailsList()
    }
  }

  onPressSearchButton = () => {
    this.getJobDetailsList()
  }

  onChangeSalary = event => {
    this.setState({minSalary: event.target.value}, this.getJobDetailsList)
  }

  onChangeEmployType = event => {
    const {employeeTypeList} = this.state
    const checkEmployeeType = employeeTypeList.filter(
      each => each === event.target.value,
    )
    if (checkEmployeeType.length === 0) {
      this.setState(
        prevState => ({
          employeeTypeList: [...prevState.employeeTypeList, event.target.value],
        }),
        this.getJobDetailsList,
      )
    } else {
      const filterData = employeeTypeList.filter(
        each => each !== event.target.value,
      )
      this.setState({employeeTypeList: filterData}, this.getJobDetailsList)
    }
  }

  FilterBySearch = () => {
    const {searchInput} = this.state
    return (
      <div className="filter-by-search-container">
        <input
          type="search"
          className="filter-by-search-input"
          value={searchInput}
          onChange={this.onEnterSearchInput}
          onKeyDown={this.onPressEnterKey}
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-button each-nav-link-item"
          onClick={this.onPressSearchButton}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  filterByEmployType = () => (
    <ul className="filter-by-employ-type-list">
      {employmentTypesList.map(employ => (
        <li className="checkbox-list-items" key={employ.employmentTypeId}>
          <input
            type="checkbox"
            className="check-radio each-nav-link-item"
            id={employ.employmentTypeId}
            value={employ.employmentTypeId}
            onChange={this.onChangeEmployType}
          />
          <label
            htmlFor={employ.employmentTypeId}
            className="filter-by-employ-checkbox-label each-nav-link-item"
          >
            {employ.label}
          </label>
        </li>
      ))}
    </ul>
  )

  filterBySalary = () => (
    <ul className="filter-by-employ-type-list">
      {salaryRangesList.map(salary => (
        <li className="checkbox-list-items" key={salary.salaryRangeId}>
          <input
            type="radio"
            className="check-radio each-nav-link-item"
            id={salary.salaryRangeId}
            name="salary"
            onChange={this.onChangeSalary}
            value={salary.salaryRangeId}
          />
          <label
            htmlFor={salary.salaryRangeId}
            className="filter-by-employ-checkbox-label each-nav-link-item"
          >
            {salary.label}
          </label>
        </li>
      ))}
    </ul>
  )

  render() {
    return (
      <>
        <Header />
        <div className="jobs-background-container">
          <div className="jobs-section-bg-container">
            <div className="profile-filter-container">
              <div className="input-search-sm-filter">
                {this.FilterBySearch()}
              </div>
              <Profile />
              <h1 className="salary-heading">Type of Employment</h1>
              {this.filterByEmployType()}
              <h1 className="salary-heading">Salary Range</h1>
              {this.filterBySalary()}
            </div>
            <div>
              <div className="input-search-lg-filter">
                {this.FilterBySearch()}
              </div>
              {this.renderResults()}
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
