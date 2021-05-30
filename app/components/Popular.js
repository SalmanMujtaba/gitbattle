
import  React from 'react'

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
    this.showSelected = this.showSelected.bind(this);
  }

  initialState() {
    this.state = {
      selectedLanguage: "All"
    }
  }

  showSelected(selectedLanguage) {
    this.setState({
      selectedLanguage
    })
    // this.showSelected = this.showSelected.bind(this);
  }
  render() {

    return (
      <React.Fragment>
        <LanguagesNav selectedLanguage={this.state.selectedLanguage} showSelected={this.showSelected}>
        </LanguagesNav>
      </React.Fragment>
    )
  }
}
