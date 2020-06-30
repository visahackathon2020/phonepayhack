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
    
    // Set the error field class names
    const getFormClass = (errMsg, errMsgField) => {
      return errMsg ? (errMsgField != '' ? 'form-invalid-border' : '') : ''
    }
    const formBusinessNameClass = getFormClass(this.props.ErrorMessage, this.props.ErrorMessage ? this.props.ErrorMessage.businessName : null)
    const formEmailClass = getFormClass(this.props.ErrorMessage, this.props.ErrorMessage ? this.props.ErrorMessage.email : null)
    
    return (
        <div className="MerchantInvoice">
          <Form onSubmit={this.handleSubmit}>
            <div id="invoiceRow">
                <div className="form-field" id="center">
                  <Form.Control className={formBusinessNameClass} placeholder="Business name" onChange={this.handleBusinessNameChange}/>         
                  <label class="text-danger form-invalid-feedback">{this.props.ErrorMessage ? this.props.ErrorMessage.businessName[0] : ''}</label>
                </div>
            </div>
            <div id="invoiceRow">
                <div className="form-field" id="center">
                  <Form.Control className={formEmailClass} placeholder="Business email" onChange={this.handleBusinessEmailChange}/>         
                  <label class="text-danger form-invalid-feedback">{this.props.ErrorMessage ? this.props.ErrorMessage.email[0] : ''}</label>
                </div>
            </div>
            <div id="invoiceRow">
                <Form.Control placeholder="Invoice amount" onChange={this.handleInvoiceAmtChange}/>         
            </div>
            <div id="invoiceRow">
                <textarea class="form-control" placeholder="Invoice description" onChange={this.handleInvoiceDescChange} rows="5"></textarea>
            </div>
            
            <div className="buttonsRow">
                <Button variant="primary" type="submit" id="buttonBlue" onClick={this.handleSubmit}>
                    <a id='submitText'>Submit</a><a  id='goldenArrow'> {'➤'} </a>
                </Button>
            </div>

            <br></br>
            <br></br>
            <h1 class="smallVisaBlue">Alias: {this.props.Alias}</h1>
          </Form>
        </div>  
        
      );
  }
}

export default MerchantInvoice;
