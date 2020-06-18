import React, { Component} from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


class ConsumerForm extends Component {
  constructor(props) {
    super(props)
    this.state={
        Response: "Not yet requested",
        Alias: "No alias generated",
        Password: "",
        Email: "",
        FirstName: "",
        LastName: "",
        MessageBox: ""
      }
      this.handleEmailChange = this.handleEmailChange.bind(this)
      this.handlePasswordChange = this.handlePasswordChange.bind(this)
      this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
      this.handleLastNameChange = this.handleLastNameChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)

  }

  handleEmailChange(e){
    this.setState({Email: e.target.value});
  }

  handlePasswordChange(e){
    this.setState({Password: e.target.value});
  }

  handleFirstNameChange(e){
    this.setState({FirstName: e.target.value});
  }

  handleLastNameChange(e){
    this.setState({LastName: e.target.value});
  }

  handleSubmit(e){
    alert("")
    var outStr  ="Your email was " + this.state.Email + ", your password was " + this.state.Password + ", and your full name was " + this.state.FirstName
    outStr += " " + this.state.LastName
    this.setState({MessageBox: outStr})

    fetch('https://randomuser.me/api/')
    .then(response => {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(data => {
      this.setState({Response: "Merchant name was " + data.results[0].name.first + ' ' + data.results[0].name.last,
      Alias: "Merchant alias was " + data.results[0].email})
    })

    
    
    e.preventDefault()
  }

  render() {
    
    const that = this;
    // Do this for the form submission https://stackoverflow.com/questions/23427384/get-form-data-in-reactjs

    

    

    return (
        <div className="ConsumerForm">
          <h1>Consumer Information Form</h1>
          <Form onSubmit={that.handleSubmit}>
          <div className="theRow">
                <Form.Control placeholder="First name" id="rightMarg" onChange={that.handleFirstNameChange}/>
                <Form.Control placeholder="Last name" id="leftMarg" onChange={that.handleLastNameChange}/>
            </div>
            <Form.Group controlId="formGroupEmail" className="formField">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={that.handleEmailChange} />
            </Form.Group>
            <Form.Group controlId="formGroupPassword" className="formField">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={that.handlePasswordChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <br></br>
          <h1>Response: {this.state.Response}</h1>
          <h1>Alias: {this.state.Alias}</h1>
          <h1>Message Box: {this.state.MessageBox}</h1>

        </div>  
        
      );
  }
}

export default ConsumerForm;