
import  React from 'react';
import { fetchRepos } from '../utils/api';
import { Header } from './Header';
import ReposGrid from './Grid';

export default class Popular extends React.Component {

  constructor(props) {
    super(props);
    this.initialState();
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage)
  }

  initialState() {
    this.state = {
      selectedLanguage: "All",
      error: null,
      repos: {}
    }
  }

  updateLanguage = (selectedLanguage) => {
    this.setState({
      selectedLanguage,
      error: null,
    })
    if(!this.state.repos[selectedLanguage]) {
      this.fetchData(selectedLanguage);
    }
  }

  fetchData(selectedLanguage) {
    this.props.isSpinner(true);
    fetchRepos(selectedLanguage)
    .then(repos => {
      this.populateState(repos, selectedLanguage);
    })
    .catch((error)=> {
      console.log(error);
      this.setErrorState(error);
    })
    .finally( () => {
      this.props.isSpinner(false);
    }) 
  }

  populateState(reposData, selectedLanguage) {
    this.setState(({repos}) => ({
      repos: {
        ...repos,
        [selectedLanguage]: reposData
      }
    }));
  }

  setErrorState(error) {
    this.setState({
      error
    });
  }


  render() { 
    const { selectedLanguage, repos, error } = this.state;
    
    return (
      <React.Fragment>
        <Header selectedLanguage={selectedLanguage} showSelected={this.updateLanguage}>
        </Header>
        {error && <p>{error}</p>}
        {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
      </React.Fragment>
    )
  }
}
