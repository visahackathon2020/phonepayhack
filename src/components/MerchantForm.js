import React, { Component} from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MerchantLogin from './MerchantLogin';


class MerchantForm extends Component {
  constructor(props) {
    super(props)
    this.state={
        isLoggedIn: false,
        Response: "Not yet requested",
        Alias: "No alias generated",
        Name: "",
        Email: "",
        Country: "",
        BusinessName: "",
        PAN: "",
        InvoiceAmt: "",
        InvoiceDesc: "",
        MessageBox: "",
        ZipCode: "",
        StateInUSA: ""
      }
      this.handleNameChange = this.handleNameChange.bind(this)
      this.handleEmailChange = this.handleEmailChange.bind(this)
      this.handleCountryChange = this.handleCountryChange.bind(this)
      this.handleBusinessNameChange = this.handleBusinessNameChange.bind(this)
      this.handlePANChange = this.handlePANChange.bind(this)
      this.handleInvoiceAmtChange = this.handleInvoiceAmtChange.bind(this)
      this.handleInvoiceDescChange = this.handleInvoiceDescChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleStateInUSAChange = this.handleStateInUSAChange.bind(this)
      this.handleZipCodeChange = this.handleZipCodeChange.bind(this)
      this.setIsLoggedIn = this.setIsLoggedIn.bind(this)
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

  handleBusinessNameChange(e) {
    this.setState({BusinessName: e.target.value});
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

  handleStateInUSAChange(e) {
    this.setState({StateInUSA: e.target.value});
  }

  handleZipCodeChange(e) {
    this.setState({ZipCode: e.target.value});
  }

  setIsLoggedIn(value){
    this.setState({isLoggedIn: value})
  }

  handleSubmit(e){
    var that=this

    var url = 'https://kylepence.dev:5000/invoices'
    var myPostBody = {
        "name": this.state.Name,
        "businessName": this.state.BusinessName,
        "country":"USA",
        "state": this.state.StateInUSA,
        "zipcode": this.state.ZipCode,
        "PAN":this.state.PAN,
        "items": [
            {
                "desc": this.state.InvoiceDesc,
                "amount": this.state.InvoiceAmt
            }
        ]
    }

    fetch(url, {
      method:"POST",
      body: JSON.stringify(myPostBody)
          
      })
      .then(result => {
          console.log(result)
          // do something with the result
          result.json().then(data => {
            console.log(data)
            console.log(data.result.invoiceCode)
            that.setState({Alias: data.result.invoiceCode})
          })
      })
    
    e.preventDefault()
  }

  render() {
    
    const that = this;
    // Do this for the form submission https://stackoverflow.com/questions/23427384/get-form-data-in-reactjs

    
    if (!this.state.isLoggedIn){
      return (
        <div className="MerchantForm">
          <MerchantLogin action={that.setIsLoggedIn}></MerchantLogin>
        </div>
      
        )
    }
    
    
    return (
        <div className="MerchantForm">
        <h2 class="VisaBlue">Merchant Information Form</h2>
          <Form onSubmit={that.handleSubmit}>
          <div className="theRow">
            <Form.Control placeholder="Merchant name" id="rightMarg" onChange={that.handleNameChange}/>         
            <Form.Control type="email" placeholder="Enter email" id="leftMarg" onChange={that.handleEmailChange}/>
          </div>
          <div className="theRow"> 
            <Form.Control placeholder="Business Name" id="rightMarg" onChange={that.handleBusinessNameChange} />
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
            <Form.Control placeholder="State" id="rightMarg" onChange={that.handleStateInUSAChange} />
            <Form.Control placeholder="Zip Code" id="leftMarg" onChange={that.handleZipCodeChange}/>
          </div>
          <div className="theRow">
            <Form.Control type="password" placeholder="Payment Account Number" id="rightMarg" onChange={that.handlePANChange} />
            <Form.Control placeholder="Invoice amount" id="leftMarg" onChange={that.handleInvoiceAmtChange}/>
          </div>
          <dvi className="theRow">
            <textarea class="form-control" placeholder="Invoice description" onChange={that.handleInvoiceDescChange} rows="3"></textarea>
          </dvi>
          
          <div className="buttonsRow">
          <Button variant="secondary" onClick={()=>this.setIsLoggedIn(false)} id="buttonBlue">
                Log-In Again
            </Button>
          <Button variant="primary" type="submit" id="buttonBlue">
              <a id='submitText'>Submit</a><a  id='goldenArrow'> {'➤'} </a>
          </Button>
          </div>
          
          
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