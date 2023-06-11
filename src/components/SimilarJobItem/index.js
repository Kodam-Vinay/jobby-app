import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const SimilarJobItem = props => {
  const {similarJobs} = props
  const parsedData = {
    id: similarJobs.id,
    companyLogoUrl: similarJobs.company_logo_url,
    employmentType: similarJobs.employment_type,
    jobDescription: similarJobs.job_description,
    location: similarJobs.location,
    packagePerAnnum: similarJobs.package_per_annum,
    rating: similarJobs.rating,
    title: similarJobs.title,
  }
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = parsedData
  return (
    <li className="similar-job-item-list-item-container">
      <div className="similar-job-item-logo-and-info">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-job-item-list-item-company-logo"
        />
        <div className="similar-job-item-title-rating-container">
          <h1 className="similar-job-item-job-title">{title}</h1>
          <div className="similar-job-item-rating-container">
            <BsStarFill color="#fbbf24" />
            <p className="similar-job-item-rating">{rating}</p>
          </div>
        </div>
      </div>

      <div className="similar-job-item-description-container">
        <h1 className="similar-job-item-description-head">Description</h1>
        <p className="similar-job-item-description-text">{jobDescription}</p>
      </div>

      <div className="similar-job-item-location-package-type-container">
        <div className="similar-job-item-location-type-container">
          <div className="similar-job-item-rating-container">
            <MdLocationOn color="#ffffff" size={20} />
            <p className="similar-job-item-location">{location}</p>
          </div>
          <div className="similar-job-item-rating-container">
            <BsBriefcaseFill color="#ffffff" size={20} />
            <p className="similar-job-item-location">{employmentType}</p>
          </div>
        </div>
        <p className="similar-job-item-package">{packagePerAnnum}</p>
      </div>
    </li>
  )
}
export default SimilarJobItem
