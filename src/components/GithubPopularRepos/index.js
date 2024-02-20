import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    activeLanguageId: languageFiltersData[0].id,
    languageList: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getLanguages()
  }

  getLanguages = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const {activeLanguageId} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachItem => ({
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        name: eachItem.name,
        starsCount: eachItem.stars_count,
      }))
      await this.setState({
        languageList: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  filterButton = id => {
    this.setState({activeLanguageId: id}, this.getLanguages)
  }

  getRepoList = () => {
    const {languageList} = this.state

    return (
      <ul className="repo-list-container">
        {languageList.map(eachlanguage => (
          <RepositoryItem eachRepo={eachlanguage} key={eachlanguage.id} />
        ))}
      </ul>
    )
  }

  loader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  failure = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      alt="failure view"
    />
  )

  renderLanguageFiltersList = () => {
    const {activeLanguageId} = this.state

    return (
      <ul className="filter-items-container">
        {languageFiltersData.map(eachItem => (
          <LanguageFilterItem
            eachLanguageDetails={eachItem}
            key={eachItem.id}
            filterButton={this.filterButton}
            isActiveFilter={eachItem.id === activeLanguageId}
          />
        ))}
      </ul>
    )
  }

  renderRepositories = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.getRepoList()
      case apiStatusConstant.inProgress:
        return this.loader()
      case apiStatusConstant.failure:
        return this.failure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg">
        <h1>Popular</h1>
        {this.renderLanguageFiltersList()}
        {this.renderRepositories()}
      </div>
    )
  }
}

export default GithubPopularRepos
