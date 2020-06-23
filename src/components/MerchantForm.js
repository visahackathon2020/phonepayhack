

import React, { Component} from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


class MerchantForm extends Component {
  constructor(props) {
    super(props)
    this.state={
        Response: "Not yet requested",
        Alias: "No alias generated",
        Name: "",
        Email: "",
        Country: "",
        BIN: "",
        PAN: "",
        InvoiceAmt: "",
        InvoiceDesc: "",
        MessageBox: ""
      }
      this.handleNameChange = this.handleNameChange.bind(this)
      this.handleEmailChange = this.handleEmailChange.bind(this)
      this.handleCountryChange = this.handleCountryChange.bind(this)
      this.handleBINChange = this.handleBINChange.bind(this)
      this.handlePANChange = this.handlePANChange.bind(this)
      this.handleInvoiceAmtChange = this.handleInvoiceAmtChange.bind(this)
      this.handleInvoiceDescChange = this.handleInvoiceDescChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)

  }

  handleNameChange(e){
    this.setState({Name: e.target.value});
  }

  handleEmailChange(e){
    this.setState({Email: e.target.value});
  }

  handleCountryChange(e) {
    this.setState({Country: e.target.value});
  }

  handleBINChange(e) {
    this.setState({BIN: e.target.value});
  }

  handlePANChange(e) {
    this.setState({PAN: e.target.value});
  }

  handleInvoiceAmtChange(e) {
    this.setState({InvoiceAmt: e.target.value});
  }

  handleInvoiceDescChange(e) {
    this.setState({InvoiceDesc: e.target.value});
  }

  handleSubmit(e){
    var that=this
    // var outStr  = "Business name was " + this.state.Name + ", Email was " + this.state.Email + ", BIN was " + this.state.BIN + ", PAN was " + this.state.PAN
    // + ", country was " + this.state.Country + ", Invoice Amout: " + this.state.InvoiceAmt + ", Invoice Description: " + this.state.InvoiceDesc
  
    var url = 'https://kylepence.dev:5000/invoices'
    // const options = {
    //   method : "POST",
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: body_str
    // };

    fetch(url, {
      method:"POST",
      body: JSON.stringify({
          merchantid: "12345678900000000000000000000000",
          invoiceAmt: this.state.InvoiceAmt,
          invoiceDesc: this.state.InvoiceDesc,
          merchantName: this.state.Name
          })
          
      })
      .then(result => {
          console.log(result)
          // do something with the result
          result.json().then(data => {
            console.log(data)
            console.log(data.result.invoiceCode)
            that.setState({Alias: data.result.invoiceCode})
          }
            
            
            )
         
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
            <Form.Control placeholder="Business name" id="rightMarg" onChange={that.handleNameChange}/>         
            <Form.Control type="email" placeholder="Enter email" id="leftMarg" onChange={that.handleEmailChange}/>
          </div>
          <div className="theRow"> 
            <Form.Control type="password" placeholder="Business Identification Number" id="rightMarg" onChange={that.handleBINChange} />
            <Form.Control as="select" defaultValue="Choose..." id="leftMarg" onChange={that.handleCountryChange}>
              <option>Choose...</option>
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Canada</option>
              <option>Mexico</option>
              <option>China</option>
            </Form.Control>
          </div>
          <div className="theRow">
            <Form.Control type="password" placeholder="Payment Account Number" id="rightMarg" onChange={that.handlePANChange} />
            <Form.Control placeholder="Invoice amount" id="leftMarg" onChange={that.handleInvoiceAmtChange}/>
          </div>
          <dvi className="theRow">
            <textarea class="form-control" placeholder="Invoice description" onChange={that.handleInvoiceDescChange} rows="3"></textarea>
          </dvi>
          
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