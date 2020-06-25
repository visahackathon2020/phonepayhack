import React, { Component} from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import GetInvoiceForm from './GetInvoiceForm';


class ConsumerForm extends Component {
  constructor(props) {
    super(props)
    this.state={
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
        LastName: ""
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

  handleExpirationChange(e){
    this.setState({Expiration: e.target.value});
  }

  handleSecurityCodeChange(e){
    this.setState({CVV: e.target.value});
  }

  handleSubmit(e){

    var url = 'https://kylepence.dev:5000/payment'
    var myPostBody = {
        "senderPAN": this.state.CreditCard,
        "invoiceId": this.state.InvoiceCode
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
      
      this.setState({MerchantName: data.result.invoiceObj.name + ' ',
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



    return (
        <div className="ConsumerForm">
          <h2 class="VisaBlue">Consumer Billing Form #{this.state.InvoiceCode}</h2>
          <h1 class="smallVisaBlue">Merchant Name: {this.state.MerchantName}</h1>
          <h1 class="smallVisaBlue">Invoice Cost: {this.state.OrderPrice}</h1>
          <h1 class="smallVisaBlue">Invoice Description: {this.state.InvoiceDescription}</h1>
          <br></br>

          <Form onSubmit={that.handleSubmit}>
          <div className="theRow">
              <Form.Group as={Col} md="4">
                <Form.Control placeholder="First name" onChange={that.handleFirstNameChange}/>
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Control placeholder="Last name" onChange={that.handleLastNameChange}/>
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Control type="email" placeholder="Enter email" onChange={that.handleEmailChange}/>
              </Form.Group>
          </div>
          <div className="theRow">
              <Form.Group as={Col} md="6">
                <Form.Control type="password" placeholder="Card number" onChange={that.handleCreditCardChange} />
              </Form.Group>
              <Form.Group as={Col} md="3">
                <Form.Control placeholder="MM/YY" onChange={that.handleExpirationChange}/>
              </Form.Group>
              <Form.Group as={Col} md="3">
                <Form.Control placeholder="CVV" onChange={that.handleSecurityCodeChange}/>
              </Form.Group>
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