import React, { Component} from 'react';
import {Form, Row, Col, Button, FormGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import GetInvoiceForm from './GetInvoiceForm';


class ConsumerForm extends Component {
  constructor(props) {
    super(props)
    this.state={
        ErrorMessage: null,
        DoesInvoiceExist: false,
        InvoiceCode: "",
        OrderPrice: "Loading...",
        MerchantName: "Loading...",
        InvoiceDescription: "Loading...",
        CreditCard: "",
        Expiration: "",
        CVV: "",
        Email: "",
        FirstName: "",
        LastName: "",
        EmailReceipt: {isChecked: false}
      }
      this.handleEmailChange = this.handleEmailChange.bind(this)
      this.handleCreditCardChange = this.handleCreditCardChange.bind(this)
      this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
      this.handleLastNameChange = this.handleLastNameChange.bind(this)
      this.handleFindOrder = this.handleFindOrder.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.newCodePage = this.newCodePage.bind(this)
      this.handleExpirationChange = this.handleExpirationChange.bind(this)
      this.handleSecurityCodeChange = this.handleSecurityCodeChange.bind(this)
      this.handleEmailReceipt = this.handleEmailReceipt.bind(this)

  }

  handleEmailChange(e){
    this.setState({Email: e.target.value,
      ErrorMessage: this.state.ErrorMessage ? {...this.state.ErrorMessage, email:''}: null});
  }

  handleCreditCardChange(e){
    this.setState({CreditCard: e.target.value,
      ErrorMessage: this.state.ErrorMessage ? {...this.state.ErrorMessage, senderPAN:''}: null});
  }

  handleFirstNameChange(e){
    this.setState({FirstName: e.target.value});
  }

  handleLastNameChange(e){
    this.setState({LastName: e.target.value});
  }

  handleExpirationChange(e){
    this.setState({Expiration: e.target.value});
  }

  handleSecurityCodeChange(e){
    this.setState({CVV: e.target.value});
  }

  handleEmailReceipt() {
    this.setState({isChecked: !this.state.isChecked});
  }

  handleSubmit(e){

    var url = 'https://kylepence.dev:5000/payment'
    var myPostBody = {
        "senderPAN": this.state.CreditCard,
        "invoiceId": this.state.InvoiceCode,
        "email": this.state.Email
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
            console.log(data.result)
            let errorMessage = null
            if (data.status == 'fail') {
              errorMessage = {email:'',senderPAN:'', ...data.result.errorMessage}
            }
            this.setState({ErrorMessage: errorMessage})
          })
      })

    e.preventDefault()
  }

  handleFindOrder(orderStr){
    this.setState({DoesInvoiceExist: true});
    this.setState({InvoiceCode: orderStr})


    fetch('https://kylepence.dev:5000/invoices/' + orderStr)
    .then(response => {
      if(response.ok) return response.json();
      
      throw new Error('Request failed.');
    })
    .then(data => {
      console.log(data)
      
      this.setState({MerchantName: data.result.invoiceObj.businessName + ' ',
      OrderPrice: data.result.invoiceObj.items[0].amount,
      InvoiceDescription:  data.result.invoiceObj.items[0].desc})

    }).catch(error =>{
      this.setState({DoesInvoiceExist: false});
      this.setState({InvoiceCode: ""})
    })

  }

  newCodePage(){
    this.setState({DoesInvoiceExist: false})
    this.setState({InvoiceCode: ""})
  }

  render() {
    
    const that = this;
    // Do this for the form submission https://stackoverflow.com/questions/23427384/get-form-data-in-reactjs

    if (!this.state.DoesInvoiceExist){
      return(
        <GetInvoiceForm action={this.handleFindOrder} revert={this.newCodePage}></GetInvoiceForm>
      )
    }

    // Set the error field class names
    const getFormClass = (errMsg, errMsgField) => {
      return errMsg ? (errMsgField != '' ? 'form-invalid-border' : '') : ''
    }
    const formEmailClass = getFormClass(this.state.ErrorMessage, this.state.ErrorMessage ? this.state.ErrorMessage.email : null)
    const formPANClass = getFormClass(this.state.ErrorMessage, this.state.ErrorMessage ? this.state.ErrorMessage.senderPAN : null)



    return (
        <div className="ConsumerForm">
          <h2 class="VisaBlue">Consumer Billing Form #{this.state.InvoiceCode}</h2>
          <h1 class="smallVisaBlue">Merchant Name: {this.state.MerchantName}</h1>
          <h1 class="smallVisaBlue">Invoice Cost: {this.state.OrderPrice}</h1>
          <h1 class="smallVisaBlue">Invoice Description: {this.state.InvoiceDescription}</h1>

          <br></br>
          <Form onSubmit={that.handleSubmit}>
          <div className="consRow">
              <Form.Group as={Col} md="4">
                <Form.Control placeholder="First name" onChange={that.handleFirstNameChange}/>
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Control placeholder="Last name" onChange={that.handleLastNameChange}/>
              </Form.Group>
              <Form.Group as={Col} md="4">
                <div className="form-field">
                  <Form.Control className={formEmailClass} type="email" placeholder="Enter email" onChange={that.handleEmailChange}/>
                  <label class="text-danger form-invalid-feedback">{this.state.ErrorMessage ? this.state.ErrorMessage.email[0] : ''}</label>
                </div>
              </Form.Group>
          </div>
          <div className="consRow">
              <Form.Group as={Col} md="6">
                <div className="form-field">
                  <Form.Control className={formPANClass} type="password" placeholder="Card number" onChange={that.handleCreditCardChange} />
                  <label class="text-danger form-invalid-feedback">{this.state.ErrorMessage ? this.state.ErrorMessage.senderPAN[0] : ''}</label>
                </div>
              </Form.Group>
              <Form.Group as={Col} md="3">
                <Form.Control placeholder="MM/YY" onChange={that.handleExpirationChange}/>
                <div className="invalid-feedback">
                  Invalid Expiration Date.
                </div>
              </Form.Group>
              <Form.Group as={Col} md="3">
                <Form.Control placeholder="CVV" onChange={that.handleSecurityCodeChange}/>
                <div className="invalid-feedback">
                  Invalid CVV.
                </div>
              </Form.Group>
          </div>
          <div className="consRow">
            <div class="d-flex flex-row">
              <Form.Group as={Col} id="formGridCheckbox">
                <Form.Check type="checkbox" label="Email receipt" onChange={this.handleEmailReceipt}/>
              </Form.Group>
            </div>
          </div>

          <div className="buttonsRow">
            <Button variant="secondary" onClick={()=>this.newCodePage()} id="buttonBlue">
                Re-Enter Code
            </Button>
            <Button variant="primary" type="submit" id="buttonBlue">
                <a id='submitText'>Pay</a><a  id='goldenArrow'> {'➤'} </a>
            </Button>
          </div>
          
          </Form>
        </div>  
        
      );
  }
}

export default ConsumerForm;
