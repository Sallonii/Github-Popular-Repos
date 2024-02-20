import './index.css'

const RepositoryItem = props => {
  const {eachRepo} = props
  const {avatarUrl, forksCount, issuesCount, starsCount, name} = eachRepo

  return (
    <li className="repo-item">
      <img src={avatarUrl} alt={name} className="avatar-img" />
      <h1 className="repo-name">{name}</h1>
      <div className="details">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icon"
        />
        <p>{`${starsCount} stars`}</p>
      </div>
      <div className="details">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icon"
        />
        <p>{`${forksCount} forks`}</p>
      </div>
      <div className="details">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="icon"
        />
        <p>{`${issuesCount} open issues`}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
