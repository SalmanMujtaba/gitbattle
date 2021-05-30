
import  React from 'react'
import {fetchRepos} from '../utils/api'

function LanguagesNav({selectedLanguage, showSelected}) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

  return (
    <ul className='flex-center'>
    {
      languages.map((language) => (
      <li key={language}>
        <button 
          onClick={()=> showSelected(language)} 
          style={language === selectedLanguage? {color: "blue"}: null} 
          className='btn-clear nav-link'>{language}
        </button>
      </li>
    ))
    }
  </ul>
  )
}

export default class Popular extends React.Component {

  constructor(props) {
    super(props);
    this.initialState();
    this.updateLanguage = this.updateLanguage.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage)
  }

  initialState() {
    this.state = {
      selectedLanguage: "All",
      error: null,
      repos: null
    }
  }

  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage,
      error: null,
      repos: null
    })
    fetchRepos(selectedLanguage)
      .then(repos => {
        this.setState({
          repos,
          error: null
        });
      })
      .catch((error)=> {
        this.setState({
          error
        });
      })
  }

  isLoading() {
    return !this.state.repos && !this.state.error
  }

 
  render() { 
    const { selectedLanguage, repos, error } = this.state
    return (
      <React.Fragment>
        <LanguagesNav selectedLanguage={selectedLanguage} showSelected={this.updateLanguage}>
        </LanguagesNav>
        {this.isLoading() && <p>LOADING</p>}

{error && <p>{error}</p>}

{repos && <pre>{JSON.stringify(repos, null, 2)}</pre>}
      </React.Fragment>
    )
  }
}
