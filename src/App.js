import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import  ConsumerForm  from './components/ConsumerForm.js'

class App extends Component {

  constructor(props) {
    super(props)
    this.state={
      mainArray: ["Hackathon Project"]
    }

  }

  render() {
  
    return (
    <div className="App">
      <h1>{'Title: ' + this.state.mainArray[0]}</h1>
      <ConsumerForm></ConsumerForm>
    </div>
    )
  }
}

export default App;