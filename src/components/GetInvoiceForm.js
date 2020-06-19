import React, { Component} from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


class GetInvoiceForm extends Component {
  constructor(props) {
    super(props)
    this.state={
        Response: "Not yet requested",
        Alias: "No alias generated",
        SpecialCode: "",
        MessageBox: ""
      }
      this.handleSpecialCodeChange = this.handleSpecialCodeChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)

  }

  handleSpecialCodeChange(e){
    this.setState({SpecialCode: e.target.value});
  }


  handleSubmit(e){
    var outStr  = "Your special code was " + this.state.SpecialCode 
    this.setState({MessageBox: outStr})
    this.props.action(this.state.SpecialCode)
    e.preventDefault()
  }

  render() {
    
    const that = this;
    // Do this for the form submission https://stackoverflow.com/questions/23427384/get-form-data-in-reactjs

    

    

    return (
        <div className="GetInvoiceForm">
          <h2 class="VisaBlue">Enter Order Code</h2>
          <Form onSubmit={that.handleSubmit}>
          <div id="specialCode">
                <Form.Control placeholder="Special Code"  id="specialCodeField" onChange={that.handleSpecialCodeChange}/>
          </div>
          
          <Button variant="primary" type="submit" id="buttonBlue">
              <a id='submitText'>Find Order</a><a  id='goldenArrow'> {'➤'} </a>
          </Button>
          
          </Form>
        </div>  
        
      );
  }
}

export default GetInvoiceForm;