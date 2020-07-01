import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
      doesInvoiceExist: false,
      invoiceCode: "",
      response: "Not yet requested",
      alias: "No alias generated",
      messageBox: "",
    };
    this.handleInvoiceCodeChange = this.handleInvoiceCodeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInvoiceCodeChange(e) {
    this.setState({ invoiceCode: e.target.value });
  }

  handleSubmit(event) {
    this.props.history.push(`/invoice/${this.state.invoiceCode.trim()}`);
  }

  render() {
    const that = this;
    // Do this for the form submission https://stackoverflow.com/questions/23427384/get-form-data-in-reactjs
    return (
      <div className="GetInvoiceForm">
        <h2 className="VisaBlue" id="header">
          Enter Order Code
        </h2>
        <Form onSubmit={that.handleSubmit}>
          <div id="specialCode">
            <Form.Control
              placeholder="Special Code"
              id="specialCodeField"
              onChange={that.handleInvoiceCodeChange}
            />
          </div>
          <Button variant="primary" type="submit" id="buttonBlue">
            <span id="submitText">Find Order</span>
            <span id="goldenArrow">➤</span>
          </Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(Home);
