import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Button} from 'react-bootstrap';

import  ConsumerForm  from './components/ConsumerForm.js'

class App extends Component {

  constructor(props) {
    super(props)
    this.state={
      portal: "Consumer"
    }
    this.handleSwap = this.handleSwap.bind(this)

  }

  handleSwap(e){
    if (this.state.portal === "Consumer"){
      this.setState({portal: "Merchant"});
    }
    else {
      this.setState({portal: "Consumer"});
    }
    
  }

  render() {
    if (this.state.portal == "Consumer") {
      return (
        <div className="App">
          {/* <h1>{'Title: ' + this.state.mainArray[0]}</h1> */}
          <ConsumerForm></ConsumerForm>
          <Button variant="secondary" onClick={this.handleSwap}>Switch to other portal</Button>
        </div>
        )
    }
    return (
      <div className="App">
        {<h1>{'Woot'}</h1>}
        <Button variant="secondary" onClick={this.handleSwap}>Switch to other portal</Button>
      </div>
      )
    
  }
}

export default App;