import React, { Component} from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


class MerchantInvoice extends Component {
  constructor(props) {
    super(props)
    this.state={
        BusinessName: "",
        InvoiceAmt: "",
        InvoiceDesc: ""
      }
      this.handleBusinessNameChange = this.handleBusinessNameChange.bind(this)
      this.handleInvoiceAmtChange = this.handleInvoiceAmtChange.bind(this)
      this.handleInvoiceDescChange = this.handleInvoiceDescChange.bind(this)
  }

  handleBusinessNameChange(e){
    this.setState({BusinessName: e.target.value});
  }

  handleInvoiceAmtChange(e) {
    this.setState({InvoiceAmt: e.target.value});
  }

  handleInvoiceDescChange(e) {
    this.setState({InvoiceDesc: e.target.value});
  }


  handleSubmit(e){
    var that=this

    var myProps = {
        BusinessName: this.state.BusinessName,
        InvoiceAmt: this.state.InvoiceAmt,
        InvoiceDesc: this.state.InvoiceDesc
    }
    console.log(myProps)
    alert("...")
    that.props.action(myProps)
    
    e.preventDefault()
  }

  render() {
    
    const that = this;
    // Do this for the form submission https://stackoverflow.com/questions/23427384/get-form-data-in-reactjs
    
    
    return (
        <div className="MerchantInvoice">
          <Form onSubmit={that.handleSubmit}>
            <div id="invoiceRow">
                <Form.Control placeholder="Business name" id="center" onChange={that.handleBusinessNameChange}/>         
            </div>
            <div id="invoiceRow">
                <Form.Control placeholder="Invoice amount" id="center" onChange={that.handleInvoiceAmtChange}/>         
            </div>
            <div id="invoiceRow">
                <textarea class="form-control" placeholder="Invoice description" onChange={that.handleInvoiceDescChange} rows="5"></textarea>
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