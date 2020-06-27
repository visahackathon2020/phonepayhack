import React, { Component} from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


class MerchantInvoice extends Component {
  constructor(props) {
    super(props)
    this.state={
        BusinessName: "",
        BusinessEmail: "",
        InvoiceAmt: "",
        InvoiceDesc: ""
      }
      this.handleBusinessNameChange = this.handleBusinessNameChange.bind(this)
      this.handleBusinessEmailChange = this.handleBusinessEmailChange.bind(this)
      this.handleInvoiceAmtChange = this.handleInvoiceAmtChange.bind(this)
      this.handleInvoiceDescChange = this.handleInvoiceDescChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleBusinessNameChange(e){
    this.setState({BusinessName: e.target.value});
  }

  handleBusinessEmailChange(e) {
      this.setState({BusinessEmail: e.target.value});
  }

  handleInvoiceAmtChange(e) {
    this.setState({InvoiceAmt: e.target.value});
  }

  handleInvoiceDescChange(e) {
    this.setState({InvoiceDesc: e.target.value});
  }


  handleSubmit(e){
    var myProps = {
        merchantToken: this.props.IdToken,
        businessName: this.state.BusinessName,
        email: this.state.BusinessEmail,
        items: [
            {
                desc: this.state.InvoiceDesc,
                amount: this.state.InvoiceAmt
            }
        ]
    }
    e.preventDefault()
    console.log(e)
    
    console.log(myProps)
    
    this.props.action(myProps)
  }

  render() {
    // Do this for the form submission https://stackoverflow.com/questions/23427384/get-form-data-in-reactjs
    
    
    return (
        <div className="MerchantInvoice">
          <Form onSubmit={this.handleSubmit}>
            <div id="invoiceRow">
                <Form.Control placeholder="Business name" id="center" onChange={this.handleBusinessNameChange}/>         
            </div>
            <div id="invoiceRow">
                <Form.Control placeholder="Business email" id="center" onChange={this.handleBusinessEmailChange}/>         
            </div>
            <div id="invoiceRow">
                <Form.Control placeholder="Invoice amount" id="center" onChange={this.handleInvoiceAmtChange}/>         
            </div>
            <div id="invoiceRow">
                <textarea class="form-control" placeholder="Invoice description" onChange={this.handleInvoiceDescChange} rows="5"></textarea>
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

export default MerchantInvoice;