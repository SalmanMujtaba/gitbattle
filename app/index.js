import React from "react";
import  ReactDOM  from 'react-dom'
import './styles/index.scss'
// import Container from 'react-bootstrap/Container'
// import Nav from 'react-bootstrap/Nav'
import Popular from './components/Popular'

class App extends React.Component {
  render() {
    // const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];
    return(
      <div className='container'>
        <Popular />
      </div>
      // <Container>
      //   <Nav className="justify-content-center" activeKey="/home" onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}>
      //     {
      //       languages.map((language) => (
      //         <Nav.Item><Nav.Link eventKey="link-2">{language}</Nav.Link><Nav.item/>
      //       ))
      //     }
      //   </Nav>
      // </Container>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
)