import React, { Component} from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


class FirstTimeMerchantForm extends Component {
  constructor(props) {
    super(props)
    this.state={
        Name: "",
        Country: "",
        PAN: "",
        ZipCode: "",
        StateInUSA: ""
      }
      this.handleNameChange = this.handleNameChange.bind(this)
      this.handleCountryChange = this.handleCountryChange.bind(this)
      this.handlePANChange = this.handlePANChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleStateInUSAChange = this.handleStateInUSAChange.bind(this)
      this.handleZipCodeChange = this.handleZipCodeChange.bind(this)
  }

  handleNameChange(e){
    this.setState({Name: e.target.value});
  }

  handleCountryChange(e) {
    this.setState({Country: e.target.value});
  }

  handlePANChange(e) {
    this.setState({PAN: e.target.value});
  }

  handleStateInUSAChange(e) {
    this.setState({StateInUSA: e.target.value});
  }

  handleZipCodeChange(e) {
    this.setState({ZipCode: e.target.value});
  }


  handleSubmit(e){
    var that=this

    var myProps = {
        name: this.state.Name,
        country: "USA",
        state: this.state.StateInUSA,
        zipcode: this.state.ZipCode,
        PAN: this.state.PAN
    }

    that.props.action(myProps)
    
    e.preventDefault()
  }

  render() {
    
    const that = this;
    // Do this for the form submission https://stackoverflow.com/questions/23427384/get-form-data-in-reactjs
    
    
    return (
        <div className="FirstTimeMerchantForm">
        <h2 class="VisaBlue">Create Merchant Account</h2>
          <Form onSubmit={that.handleSubmit}>
          <div className="theRow">
            <Form.Control placeholder="Merchant name" id="rightMarg" onChange={that.handleNameChange}/>     
            <Form.Control placeholder="Cardholder Name" id="leftMarg" />     
          </div>
          <div className="theRow"> 
            <Form.Control as="select" defaultValue="Choose..." id="rightMarg" onChange={that.handleCountryChange}>
              <option>Choose...</option>
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Canada</option>
              <option>Mexico</option>
              <option>China</option>
            </Form.Control>
            <Form.Control type="password" placeholder="Payment Account Number" id="leftMarg" onChange={that.handlePANChange} />
          </div>
          <div className="theRow">
            <Form.Control placeholder="State" id="rightMarg" onChange={that.handleStateInUSAChange} />
            <Form.Control placeholder="Zip Code" id="leftMarg" onChange={that.handleZipCodeChange}/>
          </div>
          <div className="buttonsRow">
          <Button variant="primary" type="submit" id="buttonBlue">
              <a id='submitText'>Submit</a><a  id='goldenArrow'> {'➤'} </a>
          </Button>
          </div>
          
          
          </Form>
        </div>  
        
      );
  }
}

export default FirstTimeMerchantForm;