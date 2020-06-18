import React, { Component} from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


class MerchantForm extends Component {
  constructor(props) {
    super(props)
    this.state={
        Response: "Not yet requested",
        Alias: "No alias generated",
        CreditCard: "",
        Email: "",
        FirstName: "",
        LastName: "",
        MessageBox: ""
      }
      this.handleEmailChange = this.handleEmailChange.bind(this)
      this.handleCreditCardChange = this.handleCreditCardChange.bind(this)
      this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
      this.handleLastNameChange = this.handleLastNameChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)

  }

  handleEmailChange(e){
    this.setState({Email: e.target.value});
  }

  handleCreditCardChange(e){
    this.setState({CreditCard: e.target.value});
  }

  handleFirstNameChange(e){
    this.setState({FirstName: e.target.value});
  }

  handleLastNameChange(e){
    this.setState({LastName: e.target.value});
  }

  handleSubmit(e){
    var outStr  ="Your email was " + this.state.Email + ", your CreditCard was " + this.state.CreditCard + ", and your full name was " + this.state.FirstName
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
        <div className="MerchantForm">
        <h2 class="VisaBlue">Merchant Information Form</h2>
          <Form onSubmit={that.handleSubmit}>
          <div className="theRow">
                <Form.Control placeholder="First name" id="rightMarg" onChange={that.handleFirstNameChange}/>
                <Form.Control placeholder="Last name" id="leftMarg" onChange={that.handleLastNameChange}/>
          </div>
          <div className="theRow"> 
            <Form.Group controlId="formGroupEmail" id="rightMarg">
              <Form.Control type="email" placeholder="Enter email" onChange={that.handleEmailChange} />
            </Form.Group>
            <Form.Group controlId="formGroupCreditCard" id="leftMarg">
              <Form.Control type="password" placeholder="CreditCard" onChange={that.handleCreditCardChange} />
            </Form.Group>
          </div>
          <Button variant="primary" type="submit" id="buttonBlue">
              <a id='submitText'>Submit</a><a  id='goldenArrow'> {'➤'} </a>
          </Button>
          
          </Form>
          <br></br>
          <h1 class="smallVisaBlue">Response: {this.state.Response}</h1>
          <h1 class="smallVisaBlue">Alias: {this.state.Alias}</h1>
          <h1 class="smallVisaBlue">Message Box: {this.state.MessageBox}</h1>
        </div>  
        
      );
  }
}

export default MerchantForm;