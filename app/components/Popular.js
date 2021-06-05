
import  React from 'react';
import {fetchRepos} from '../utils/api';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa';

function LanguagesNav({selectedLanguage, showSelected}) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
  // console.log(showSelected)
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

const CardView = ( reposData ) => (
  <Card>
    <Card.Header className={'text-center'}>{`#${reposData.index}`}</Card.Header>
    <Card.Img variant="top" alt={`Avatar for ${reposData.login}`} src={reposData.avatar_url} />
    <Card.Body className="text-center">
      <Card.Title><Card.Link href={reposData.html_url}>{reposData.login}</Card.Link></Card.Title>
      <ListGroup variant="flush">
      <ListGroup.Item> 
        <FaStar color='rgb(255, 215, 0)' size={22}/>
          {reposData.stargazers_count.toLocaleString()} stars
        </ListGroup.Item>
      <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
      <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
    </Card.Body>
  </Card>
);

function ReposGrid ({ repos }) {;
  let cardObject = {};
  // const { login, avatar_url } = owner;
  return (
    <CardColumns> {
      repos.map(( repo, index ) => 
      {
        const { name, owner, html_url, stargazers_count, forks, open_issues } = repo
        console.log(repo)
        const { login, avatar_url } = owner;
        repo["index"] = index+1;
        return (
          <CardView key={index} {...{repo}}>
          </CardView>
        )
      })
      }
    </CardColumns>
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
    // this.fetchData(this.state.selectedLanguage);
  }

  initialState() {
    this.state = {
      selectedLanguage: "All",
      error: null,
      repos: {}
    }
  }

  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage,
      error: null,
      // repos: null
    })
    // console.log(this.state.selectedLanguage);
    if(!this.state.repos[selectedLanguage]) {
      this.fetchData(selectedLanguage);
    }
  }

  fetchData(selectedLanguage) {
    fetchRepos(selectedLanguage)
    .then(repos => {
      this.populateState(repos, selectedLanguage);
    })
    .catch((error)=> {
      this.setErrorState(error);
    })  
  }

  populateState(reposData, selectedLanguage) {
    // console.log(reposData)
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

  isLoading(selectedLanguage) {
    return !this.state.repos[selectedLanguage] && !this.state.error
  }

 
  render() { 
    const { selectedLanguage, repos, error } = this.state;
    // console.log(repos[selectedLanguage]);
    
    return (
      <React.Fragment>
        <LanguagesNav selectedLanguage={selectedLanguage} showSelected={this.updateLanguage}>
        </LanguagesNav>
        {this.isLoading(selectedLanguage) && <p>LOADING</p>}
        {error && <p>{error}</p>}
        {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
      </React.Fragment>
    )
  }
}
