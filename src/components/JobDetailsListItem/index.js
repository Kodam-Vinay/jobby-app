import {Link} from 'react-router-dom'
import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const JobDetailsListItem = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="each-all-job-details-link-container">
      <li className="each-all-job-details-list-item-container">
        <div className="each-all-job-details-logo-and-info">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="each-all-job-details-list-item-company-logo"
          />
          <div className="each-all-job-details-title-rating-container">
            <h1 className="each-all-job-details-job-title">{title}</h1>
            <div className="each-all-job-details-rating-container">
              <BsStarFill color="#fbbf24" />
              <p className="each-all-job-details-rating">{rating}</p>
            </div>
          </div>
        </div>

        <div className="each-all-job-details-location-package-type-container">
          <div className="each-all-job-details-location-type-container">
            <div className="each-all-job-details-rating-container">
              <MdLocationOn color="#ffffff" size={20} />
              <p className="each-all-job-details-location">{location}</p>
            </div>
            <div className="each-all-job-details-rating-container">
              <BsBriefcaseFill color="#ffffff" size={20} />
              <p className="each-all-job-details-location">{employmentType}</p>
            </div>
          </div>
          <p className="each-all-job-package">{packagePerAnnum}</p>
        </div>

        <hr className="horizontal-rule-all-job" />
        <div className="each-all-job-description-container">
          <h1 className="each-all-job-description-head">Description</h1>
          <p className="each-all-job-description-text">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}
export default JobDetailsListItem
