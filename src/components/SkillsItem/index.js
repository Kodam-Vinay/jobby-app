import './index.css'

const SkillsItem = props => {
  const {skillsList} = props
  const parsedData = {
    name: skillsList.name,
    imageUrl: skillsList.image_url,
  }
  const {name, imageUrl} = parsedData
  return (
    <li className="each-skill-item-container">
      <img src={imageUrl} alt={name} className="each-skill-image" />
      <p className="each-skill-name">{name}</p>
    </li>
  )
}
export default SkillsItem
