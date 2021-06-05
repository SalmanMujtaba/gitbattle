import React from "react";
import  ReactDOM  from 'react-dom'
import './styles/index.scss'
import Spinner from 'react-bootstrap/Spinner';
import Popular from './components/Popular'

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isSpinner: true
    }
  }

  spinnerBoolean = (spinnerValue) => {
    this.setState(( isSpinner ) => ({ isSpinner: spinnerValue }));
  }

  render() {
    return(
      <React.Fragment>
        {this.state.isSpinner && <div className="spinner-container flex-center"><Spinner animation="border" /></div>}
        <div className='container'>
          <Popular isSpinner={this.spinnerBoolean}/>
        </div>
      </React.Fragment>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
)