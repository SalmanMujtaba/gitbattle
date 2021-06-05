
import  React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa';

const CardView = ({ repo }) => {
  return (
    <Card className={"mb-4"}>
      <Card.Header className={'text-center'}>{`#${repo.index}`}</Card.Header>
      <Card.Img variant="top" alt={`Avatar for ${repo.login}`} src={repo.owner.avatar_url} />
      <Card.Body>
        <Card.Title className="text-center">
          <Card.Link href={`https://github.com/${repo.owner.login}`}>{repo.owner.login}
          </Card.Link>
        </Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item> 
            <FaUser color='rgb(255, 191, 116)' size={22} />
            <Card.Link href={repo.html_url}>{repo.owner.login}</Card.Link>
          </ListGroup.Item>
          <ListGroup.Item> 
            <FaStar color='rgb(255, 215, 0)' size={22}/>
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

export default CardView;