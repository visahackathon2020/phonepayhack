import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Button, Nav, Form, FormControl, Navbar} from 'react-bootstrap';
import  ConsumerForm  from './components/ConsumerForm.js'
import  MerchantForm  from './components/MerchantForm.js'
import  CustomNavbar  from './components/CustomNavbar.js'


class App extends Component {

  
  constructor(props) {
    super(props)
    this.state={
      portal: "consumer"
    }
    this.handleSwap = this.handleSwap.bind(this)

  }

  handleSwap(theStr){
      this.setState({portal: theStr});
  }

  

  render() {
    if (this.state.portal == "consumer") {
      return (
        <div className="App">
          <CustomNavbar action={this.handleSwap}></CustomNavbar>
          <ConsumerForm></ConsumerForm>
        </div>
        )
    }
    return (
      <div className="App">
        <CustomNavbar action={this.handleSwap}></CustomNavbar>
        <MerchantForm></MerchantForm>
      </div>
      )
    
  }
}


export default App;