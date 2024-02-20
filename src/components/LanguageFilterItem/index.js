import './index.css'

const LanguageFilterItem = props => {
  const {eachLanguageDetails, filterButton, isActiveFilter} = props
  const {id, language} = eachLanguageDetails

  const filterClassName = isActiveFilter ? 'active filter-btn' : 'filter-btn'

  const onClicking = () => {
    filterButton(id)
  }

  return (
    <li className="filter-item">
      <button type="button" className={filterClassName} onClick={onClicking}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
