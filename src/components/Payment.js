import React, { Component } from "react";
import Cleave from "cleave.js/react";
import { Form, Col, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ConsumerItemListForm from "./ConsumerItemListForm";
import successCheck from "../success.jpg";

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      errorMessage: null,
      errorType: null,
      invoiceCode: "",
      orderPrice: "Loading...",
      merchantName: "Loading...",
      invoiceDescription: "Loading...",
      senderPAN: "",
      expiration: "",
      CVV: "",
      email: "",
      firstName: "",
      lastName: "",
      emailReceipt: false,
      items: null,
    };
    this.handleChanges = this.handleChanges.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    const orderStr = params.id;
    const state = this.props.location.state;
    console.log("state", state, this.props);
    console.log(orderStr);
    if (state === undefined) {
      this.setState({ invoiceCode: orderStr });
      fetch("https://kylepence.dev:5000/invoices/" + orderStr)
        .then((response) => {
          if (response.ok) return response.json();
          throw new Error("Request failed.");
        })
        .then((data) => {
          console.log(data);
          this.setState({
            merchantName: data.result.invoiceObj.businessName + " ",
            orderPrice: data.result.invoiceObj.items.reduce(
              (acc, e) => e.amount + acc,
              0
            ),
            invoiceDescription: data.result.invoiceObj.additionalMessage,
            invoiceCode: orderStr,
            items: data.result.invoiceObj.items,
          });
        })
        .catch((error) => {
          this.props.history.push("/invalid");
        });
    } else {
      this.setState({
        merchantName: state.merchantName,
        orderPrice: state.orderPrice,
        invoiceDescription: state.invoiceDescription,
        invoiceCode: state.invoiceCode,
        items: state.items,
      });
    }
  }

  handleChanges(event) {
    this.setState({
      [event.target.name]: event.target.value,
      errorMessage: this.state.errorMessage
        ? { ...this.state.errorMessage, [event.target.name]: null }
        : null,
      errorType: null,
    });
  }

  handleSubmit(e) {
    var url = "https://kylepence.dev:5000/payment";
    var myPostBody = {
      senderPAN: this.state.senderPAN.split(" ").join(""),
      invoiceId: this.state.invoiceCode,
      email: this.state.email,
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(myPostBody),
    }).then((result) => {
      console.log(result);
      // do something with the result
      result.json().then((data) => {
        console.log(data);
        console.log(data.result);
        this.setState({
          errorMessage: data.result.errorMessage,
          errorType: data.result.errorType,
        });

        if (data.status === "success") {
          this.setState({ success: true });
        }
      });
    });

    e.preventDefault();
  }

  render() {
    const that = this;
    // Do this for the form submission https://stackoverflow.com/questions/23427384/get-form-data-in-reactjs
    // Set the error field class names
    const getFormClass = (attr) => {
      let err = this.state.errorMessage;
      return !err || !err[attr] || err[attr] === ""
        ? ""
        : "form-invalid-border";
    };
    const getErrorMessage = (attr) => {
      let err = this.state.errorMessage;
      return !err || !err[attr] || err[attr] === "" ? "" : err[attr][0];
    };

    if (this.state.success) {
      return (
        <div className="fullPageText">
          <div>Payment Successful</div>
          <img className="successCheck" src={successCheck} alt="success" />
        </div>
      );
    }

    return (
      <div className="ConsumerForm">
        <h2 className="VisaBlue" id="header">
          Consumer Billing Form #{this.state.invoiceCode}
        </h2>
        <h1 className="smallVisaBlue">
          Merchant Name: {this.state.merchantName}
        </h1>
        <h1 className="smallVisaBlue">
          Invoice Cost: ${parseFloat(this.state.orderPrice).toFixed(2)}
        </h1>
        {this.state.invoiceDescription !== "" &&
          this.state.invoiceDescription !== undefined && (
            <h1 className="smallVisaBlue">
              Invoice Description: {this.state.invoiceDescription}
            </h1>
          )}
        <br></br>
        <Form onSubmit={that.handleSubmit}>
          <div className="consRow">
            <Form.Group as={Col} md="4">
              <Form.Control
                name="firstName"
                placeholder="First name*"
                onChange={that.handleChanges}
                required
              />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Control
                name="lastName"
                placeholder="Last name*"
                onChange={that.handleChanges}
                required
              />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <div className="form-field">
                <Form.Control
                  className={getFormClass("email")}
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  onChange={that.handleChanges}
                />
                <label className="text-danger form-invalid-feedback">
                  {getErrorMessage("email")}
                </label>
              </div>
            </Form.Group>
          </div>
          <div className="consRow">
            <Form.Group as={Col} md="6">
              <div className="form-field">
                <Cleave
                  className={`${getFormClass("senderPAN")} form-control`}
                  name="senderPAN"
                  placeholder="Card Number*"
                  options={{ creditCard: true }}
                  onChange={that.handleChanges}
                  required
                />
                <label className="text-danger form-invalid-feedback">
                  {getErrorMessage("senderPAN")}
                </label>
              </div>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Cleave
                className="form-control"
                placeholder="MM/YY*"
                options={{ date: true, datePattern: ["m", "y"] }}
                onChange={that.handleChanges}
                required
              />
              <div className="invalid-feedback">Invalid Expiration Date.</div>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Control
                name="CVV"
                placeholder="CVV*"
                maxLength="4"
                onChange={that.handleChanges}
                pattern="[0-9]+"
                required
              />
              <div className="invalid-feedback">Invalid CVV.</div>
            </Form.Group>
          </div>
          <div className="consRow">
            <div className="d-flex flex-row">
              <Form.Group as={Col} id="formGridCheckbox">
                <Form.Check
                  name="emailReceipt"
                  type="checkbox"
                  label="Email receipt"
                  onChange={this.handleChanges}
                />
              </Form.Group>
            </div>
          </div>
          <div className="theRow">
            <ConsumerItemListForm
              items={this.state.items}
              orderPrice={this.state.orderPrice}
            />
          </div>
          <div className="buttonsRow">
            <Button
              variant="secondary"
              onClick={() => this.props.history.push("/")}
              id="buttonBlue"
            >
              Re-Enter Code
            </Button>
            <Button variant="primary" type="submit" id="buttonBlue">
              <span id="submitText">Pay</span>
              <span id="goldenArrow">➤</span>
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default withRouter(Payment);
