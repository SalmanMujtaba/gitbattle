
import  React from 'react';
import {fetchRepos} from '../utils/api';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa';

function LanguagesNav({selectedLanguage, showSelected}) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

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

const CardView = ({ repo }) => {
  return (
    <Card className={"mb-4"}>
      <Card.Header className={'text-center'}>{`#${repo.index}`}</Card.Header>
      <Card.Img variant="top" alt={`Avatar for ${repo.login}`} src={repo.owner.avatar_url} />
      <Card.Body>
        <Card.Title className="text-center">
          <Card.Link href={repo.html_url}>{repo.owner.login}
          </Card.Link>
        </Card.Title>
        <ListGroup variant="flush">
        <ListGroup.Item> 
          <FaStar className={"mb-2 mr-2"} color='rgb(255, 215, 0)' size={22}/>
          {repo.stargazers_count.toLocaleString()} stars
          </ListGroup.Item>
        <ListGroup.Item>
          <FaCodeBranch color='rgb(129, 195, 245)' size={22} />
          {repo.forks.toLocaleString()} forks
        </ListGroup.Item>
        <ListGroup.Item>
          <FaExclamationTriangle color='rgb(241, 138, 147)' size={22} />
          {repo.open_issues.toLocaleString()} open
        </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

function ReposGrid ({ repos }) {;
  let cardObject = {};
  // const { login, avatar_url } = owner;
  return (
    <CardColumns> {
      repos.map(( repo, index ) => 
      {
        const { name, owner, html_url, stargazers_count, forks, open_issues } = repo
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

  updateLanguage(selectedLanguage) {
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
        <LanguagesNav selectedLanguage={selectedLanguage} showSelected={this.updateLanguage}>
        </LanguagesNav>
        {error && <p>{error}</p>}
        {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
      </React.Fragment>
    )
  }
}
