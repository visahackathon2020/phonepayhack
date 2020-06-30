import React, { Component} from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemsListForm from './ItemsListForm';


class MerchantInvoice extends Component {
  constructor(props) {
    super(props)
    this.state={
        BusinessName: "",
        BusinessEmail: "",
        InvoiceAmt: "",
        InvoiceDesc: "",
        ErrorMessage: this.props.ErrorMessage,
        Items: [{desc:"",amount:""}]
      }
      this.handleBusinessNameChange = this.handleBusinessNameChange.bind(this)
      this.handleBusinessEmailChange = this.handleBusinessEmailChange.bind(this)
      this.handleInvoiceAmtChange = this.handleInvoiceAmtChange.bind(this)
      this.handleInvoiceDescChange = this.handleInvoiceDescChange.bind(this)
      this.handleItemsChange = this.handleItemsChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleBusinessNameChange(e){
    this.setState({BusinessName: e.target.value});
    this.props.onErrorMessageChange(this.state.ErrorMessage ? {...this.state.ErrorMessage, businessName:''}: null);
  }

  handleBusinessEmailChange(e) {
    this.setState({BusinessEmail: e.target.value});
    this.props.onErrorMessageChange(this.state.ErrorMessage ? {...this.state.ErrorMessage, email:''}: null);
  }

  handleInvoiceAmtChange(e) {
      this.setState({InvoiceAmt: e.target.value});
  }

  handleInvoiceDescChange(e) {
      this.setState({InvoiceDesc: e.target.value});
  }

  handleItemsChange(items) {
    console.log("called")
    this.setState({Items: items});
    this.props.onErrorMessageChange(this.state.ErrorMessage ? {...this.state.ErrorMessage, items:''}: null);
  }


  handleSubmit(e){
    var myProps = {
        merchantToken: this.props.IdToken,
        businessName: this.state.BusinessName,
        email: this.state.BusinessEmail,
        items: this.state.Items,
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
    const formBusinessNameClass = getFormClass(this.state.ErrorMessage, this.state.ErrorMessage ? this.state.ErrorMessage.businessName : null)
    const formEmailClass = getFormClass(this.state.ErrorMessage, this.state.ErrorMessage ? this.state.ErrorMessage.email : null)
    
    return (
        <div className="MerchantInvoice">
          <Form onSubmit={this.handleSubmit}>
            <div id="invoiceRow">
                <div className="form-field" id="center">
                  <Form.Control className={formBusinessNameClass} placeholder="Business name" onChange={this.handleBusinessNameChange}/>         
                  <label class="text-danger form-invalid-feedback">{this.state.ErrorMessage ? this.state.ErrorMessage.businessName[0] : ''}</label>
                </div>
            </div>
            <div id="invoiceRow">
                <div className="form-field" id="center">
                  <Form.Control className={formEmailClass} placeholder="Business email" onChange={this.handleBusinessEmailChange}/>         
                  <label class="text-danger form-invalid-feedback">{this.state.ErrorMessage ? this.state.ErrorMessage.email[0] : ''}</label>
                </div>
            </div>
            <div id="invoiceRow">
                <Form.Control placeholder="Invoice amount" onChange={this.handleInvoiceAmtChange}/>         
            </div>
            <div id="invoiceRow">
                <ItemsListForm action={this.handleItemsChange} Items={this.state.Items} ErrorMessage={this.props.ErrorMessage}/>
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
