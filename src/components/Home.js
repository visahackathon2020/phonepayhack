import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invalidCode: false,
      invoiceCode: "",
      response: "Not yet requested",
      alias: "No alias generated",
      messageBox: "",
    };
    this.handleInvoiceCodeChange = this.handleInvoiceCodeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInvoiceCodeChange(e) {
    this.setState({ invoiceCode: e.target.value, invalidCode: false });
  }

  handleSubmit(event) {
    const orderStr = this.state.invoiceCode;
    console.log(orderStr);
    event.preventDefault()
    //this.props.history.push(`/invoice/${orderStr.trim()}`);
    this.setState({ invoiceCode: orderStr });
    fetch("https://kylepence.dev:5000/invoices/" + orderStr)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Request failed.");
      })
      .then((data) => {
        console.log(data);
        console.log(data, "SUCCESS");
        if (data.status === "success") {
          this.props.history.push(`/invoice/${orderStr.trim()}`, {
            merchantName: data.result.invoiceObj.businessName + " ",
            orderPrice: data.result.invoiceObj.items.reduce(
              (acc, e) => e.amount + acc,
              0
            ),
            invoiceDescription: data.result.invoiceObj.items[0].desc,
          });
        } else {
          this.setState({invalidCode: true});
        }
      })
      .catch((error) => {
        this.setState({invalidCode: true});
      });
  }

  render() {
    const that = this;
    // Do this for the form submission https://stackoverflow.com/questions/23427384/get-form-data-in-reactjs
    return (
      <div className="container">
        <h2 className="VisaBlue" id="header">
          Enter Order Code
        </h2>
        <Form onSubmit={that.handleSubmit}>
          <div id="specialCode">
            <Form.Control
              placeholder="Special Code"
              className={this.state.invalidCode ? 'form-invalid-border' : ''}
              id="specialCodeField"
              onChange={that.handleInvoiceCodeChange}
              required
            />
            <label className="text-danger">
              {this.state.invalidCode ? 'Invalid Code! Try again' : ''}
            </label>
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
