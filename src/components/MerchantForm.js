import React, { Component} from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MerchantLogin from './MerchantLogin';
import LoadingPage from './LoadingPage';


class MerchantForm extends Component {
  constructor(props) {
    super(props)
    this.state={
        ErrorMessage: null,
        isLoggedIn: false,
        wantsToLogIn: true,
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
        StateInUSA: "",
        isLoading: false
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
      this.setWantsToLogIn = this.setWantsToLogIn.bind(this)
  }

  handleNameChange(e){
    this.setState({Name: e.target.value,
      ErrorMessage: this.state.ErrorMessage ? {...this.state.ErrorMessage, name:''}: null});
  }

  handleEmailChange(e){
    this.setState({Email: e.target.value,
      ErrorMessage: this.state.ErrorMessage ? {...this.state.ErrorMessage, email:''}: null});
  }

  handleCountryChange(e) {
    this.setState({Country: e.target.value,
      ErrorMessage: this.state.ErrorMessage ? {...this.state.ErrorMessage, country:''}: null});
  }

  handleBusinessNameChange(e) {
    this.setState({BusinessName: e.target.value,
      ErrorMessage: this.state.ErrorMessage ? {...this.state.ErrorMessage, businessName:''}: null});
  }

  handlePANChange(e) {
    this.setState({PAN: e.target.value,
      ErrorMessage: this.state.ErrorMessage ? {...this.state.ErrorMessage, PAN:''}: null});
  }

  handleInvoiceAmtChange(e) {
    this.setState({InvoiceAmt: ''});
  }

  handleInvoiceDescChange(e) {
    this.setState({InvoiceDesc: ''});
  }

  handleStateInUSAChange(e) {
    this.setState({StateInUSA: e.target.value,
      ErrorMessage: this.state.ErrorMessage ? {...this.state.ErrorMessage, state:''}: null});
  }

  handleZipCodeChange(e) {
    this.setState({ZipCode: e.target.value,
      ErrorMessage: this.state.ErrorMessage ? {...this.state.ErrorMessage, zipcode:''}: null});
  }

  setIsLoggedIn(value){
    this.setState({isLoggedIn: value})
  }

  setWantsToLogIn(value){
    this.setState({wantsToLogIn: value})
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
        "email":this.state.Email,
        "items": [
            {
                "desc": this.state.InvoiceDesc,
                "amount": this.state.InvoiceAmt
            }
        ]
    }
    var baseErrorMessage = {
        name: '',
        businessName: '',
        country:'',
        state: '',
        zipcode: '',
        PAN:'',
        email:'',
        items: [
            {
                desc: '',
                amount: ''
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
            let errorMessage = null
            if (data.status == 'fail') {
              errorMessage = {...baseErrorMessage, ...data.result.errorMessage}
            }
            that.setState({ErrorMessage: errorMessage, Alias: data.result.invoiceCode})
          })
      })
    
    e.preventDefault()
  }

  render() {
    
    const that = this;
    // Do this for the form submission https://stackoverflow.com/questions/23427384/get-form-data-in-reactjs

    if (this.state.isLoading){
      return (
      <div className="MerchantForm">
          <LoadingPage></LoadingPage>
      </div>
      )
    }

    if (this.state.wantsToLogIn){
      return (
        <div className="MerchantForm">
          <MerchantLogin setIsLoggedIn={that.setIsLoggedIn} setWantsToLogIn={that.setWantsToLogIn}></MerchantLogin>
        </div>
        )
    }
    
    // Set the error field class names
    const getFormClass = (errMsg, errMsgField) => {
      return errMsg ? (errMsgField != '' ? 'form-invalid-border' : '') : ''
    }
    const formNameClass = getFormClass(this.state.ErrorMessage, this.state.ErrorMessage ? this.state.ErrorMessage.name : null)
    const formEmailClass = getFormClass(this.state.ErrorMessage, this.state.ErrorMessage ? this.state.ErrorMessage.email : null)
    const formBusinessNameClass = getFormClass(this.state.ErrorMessage, this.state.ErrorMessage ? this.state.ErrorMessage.businessName : null)
    const formCountryClass = getFormClass(this.state.ErrorMessage, this.state.ErrorMessage ? this.state.ErrorMessage.country : null)
    const formStateClass = getFormClass(this.state.ErrorMessage, this.state.ErrorMessage ? this.state.ErrorMessage.state : null)
    const formZipcodeClass = getFormClass(this.state.ErrorMessage, this.state.ErrorMessage ? this.state.ErrorMessage.zipcode : null)
    const formPANClass = getFormClass(this.state.ErrorMessage, this.state.ErrorMessage ? this.state.ErrorMessage.PAN : null)

    return (
        <div className="MerchantForm">
        <h2 class="VisaBlue">Merchant Information Form</h2>
          <Form onSubmit={that.handleSubmit}>
          <div className="theRow">
            <div className="form-field" id="rightMarg">
            <Form.Control className={formNameClass} placeholder="Merchant name" onChange={that.handleNameChange}/>         
            <label class="text-danger form-invalid-feedback">{this.state.ErrorMessage ? this.state.ErrorMessage.name[0] : ''}</label>
            </div>
            <div className="form-field" id="leftMarg">
              <Form.Control className={formEmailClass} type="email" placeholder="Enter email" onChange={that.handleEmailChange}/>
              <label class="text-danger form-invalid-feedback">{this.state.ErrorMessage ? this.state.ErrorMessage.email[0] : ''}</label>
            </div>
          </div>
          <div className="theRow"> 
            <div className="form-field" id="rightMarg">
              <Form.Control className={formBusinessNameClass} placeholder="Business Name" onChange={that.handleBusinessNameChange} />
              <label class="text-danger form-invalid-feedback">{this.state.ErrorMessage ? this.state.ErrorMessage.businessName[0] : ''}</label>
            </div>
            <div className="form-field" id="leftMarg">
              <Form.Control className={formCountryClass} as="select" defaultValue="Choose..." onChange={that.handleCountryChange}>
                <option>Choose...</option>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Canada</option>
                <option>Mexico</option>
                <option>China</option>
              </Form.Control>
              <label class="text-danger form-invalid-feedback">{this.state.ErrorMessage ? this.state.ErrorMessage.country[0] : ''}</label>
            </div>
          </div>
          <div className="theRow">
            <div className="form-field" id="rightMarg">
              <Form.Control className={formStateClass} placeholder="State" onChange={that.handleStateInUSAChange} />
              <label class="text-danger form-invalid-feedback">{this.state.ErrorMessage ? this.state.ErrorMessage.state[0] : ''}</label>
            </div>
            <div className="form-field" id="leftMarg">
              <Form.Control className={formZipcodeClass} placeholder="Zip Code" onChange={that.handleZipCodeChange}/>
              <label class="text-danger form-invalid-feedback">{this.state.ErrorMessage ? this.state.ErrorMessage.zipcode[0] : ''}</label>
            </div>
          </div>
          <div className="theRow">
            <div className="form-field" id="rightMarg">
              <Form.Control className={formPANClass} type="password" placeholder="Payment Account Number" onChange={that.handlePANChange} />
              <label class="text-danger form-invalid-feedback">{this.state.ErrorMessage ? this.state.ErrorMessage.PAN[0] : ''}</label>
            </div>
            <div className="form-field" id="leftMarg">
              <Form.Control placeholder="Invoice amount" id="leftMarg" onChange={that.handleInvoiceAmtChange}/>
            </div>
          </div>
          <div className="theRow">
            <textarea class="form-control" placeholder="Invoice description" onChange={that.handleInvoiceDescChange} rows="3"></textarea>
          </div>
          
          <div className="buttonsRow">
          <Button variant="secondary" onClick={()=>this.setWantsToLogIn(true)} id="buttonBlue">
                Log-In Instead
            </Button>
          <Button variant="primary" type="submit" id="buttonBlue">
              <a id='submitText'>Submit</a><a  id='goldenArrow'> {'➤'} </a>
          </Button>
          </div>
          
          
          </Form>
          <br></br>
          <h2 class="smallVisaBlue">Response: {this.state.Response}</h2>
          <h2 class="smallVisaBlue">Alias: {this.state.Alias}</h2>
          <h2 class="smallVisaBlue">Message Box: {this.state.MessageBox}</h2>
        </div>  
        
      );
  }
}

export default MerchantForm;
