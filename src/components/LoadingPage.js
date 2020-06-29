import React, { Component} from 'react';
import {Spinner} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


class LoadingPage extends Component {
  constructor(props) {
    super(props)
    this.state={
      }
  }


  render() {
    
    const that = this;
        
    return (
        <div className="LoadingPage">
        <h2 class="VisaBlue">Loading ...</h2>
        <Spinner animation="border" />
        </div>  
        
      );
  }
}

export default LoadingPage;