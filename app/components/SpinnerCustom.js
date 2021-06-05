import  React from 'react';
import Spinner from 'react-bootstrap/Spinner';

export default class SpinnerCustom extends React.Component {
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
    return (
      <Spinner animation="border" />
    )
  }

}