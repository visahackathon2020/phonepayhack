import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingPage from "./LoadingPage";
import ItemsListForm from "./ItemsListForm";

class MerchantInvoiceFull extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
      response: "Not yet requested",
      alias: "No alias generated",
      name: "",
      email: "",
      country: "",
      businessName: "",
      PAN: "",
      messageBox: "",
      zipcode: "",
      stateInUSA: "",
      items: [{ desc: "", amount: "" }],
    };
    this.handleChanges = this.handleChanges.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleItemsChange = this.handleItemsChange.bind(this);
  }

  handleChanges(event) {
    this.setState({
      [event.target.name]: event.target.value,
      errorMessage: this.state.errorMessage
        ? { ...this.state.errorMessage, [event.target.name]: "" }
        : null,
    });
  }

  handleItemsChange(_items) {
    this.setState({ items: _items });
  }

  handleSubmit(e) {
    var that = this;

    var url = "https://kylepence.dev:5000/invoices";
    var myPostBody = {
      name: this.state.name,
      businessName: this.state.businessName,
      country: "USA",
      state: this.state.stateInUSA,
      zipcode: this.state.zipcode,
      PAN: this.state.PAN,
      email: this.state.email,
      items: this.state.items,
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(myPostBody),
    }).then((result) => {
      console.log(result);
      // do something with the result
      result.json().then((data) => {
        console.log(data);
        console.log(data.result.invoiceCode);
        that.setState({
          errorMessage: data.result.errorMessage,
          alias: data.result.invoiceCode,
        });
      });
    });

    e.preventDefault();
  }

  render() {
    const that = this;
    // Do this for the form submission https://stackoverflow.com/questions/23427384/get-form-data-in-reactjs

    if (this.state.isLoading) {
      return (
        <div className="MerchantForm">
          <LoadingPage></LoadingPage>
        </div>
      );
    }

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

    return (
      <div className="MerchantForm">
        <h2 className="VisaBlue">Merchant Information Form</h2>
        <Form onSubmit={that.handleSubmit}>
          <div className="theRow">
            <div className="form-field" id="rightMarg">
              <Form.Control
                className={getFormClass("name")}
                name="name"
                placeholder="Merchant name"
                onChange={that.handleChanges}
              />
              <label className="text-danger form-invalid-feedback">
                {getErrorMessage("name")}
              </label>
            </div>
            <div className="form-field" id="leftMarg">
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
          </div>
          <div className="theRow">
            <div className="form-field" id="rightMarg">
              <Form.Control
                className={getFormClass("businessName")}
                name="businessName"
                placeholder="Business Name"
                onChange={that.handleChanges}
              />
              <label className="text-danger form-invalid-feedback">
                {getErrorMessage("businessName")}
              </label>
            </div>
            <div className="form-field" id="leftMarg">
              <Form.Control
                className={getFormClass("country")}
                name="country"
                as="select"
                defaultValue="Choose..."
                onChange={that.handleChanges}
              >
                <option>Choose...</option>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Canada</option>
                <option>Mexico</option>
                <option>China</option>
              </Form.Control>
              <label className="text-danger form-invalid-feedback">
                {getErrorMessage("country")}
              </label>
            </div>
          </div>
          <div className="theRow">
            <div className="form-field" id="rightMarg">
              <Form.Control
                className={getFormClass("state")}
                name="state"
                placeholder="State"
                onChange={that.handleChanges}
              />
              <label className="text-danger form-invalid-feedback">
                {getErrorMessage("state")}
              </label>
            </div>
            <div className="form-field" id="leftMarg">
              <Form.Control
                className={getFormClass("zipcode")}
                name="zipcode"
                placeholder="Zip Code"
                onChange={that.handleChanges}
              />
              <label className="text-danger form-invalid-feedback">
                {getErrorMessage("zipcode")}
              </label>
            </div>
          </div>
          <div className="theRow">
            <div className="form-field" id="rightMarg">
              <Form.Control
                className={getFormClass("PAN")}
                name="PAN"
                type="password"
                placeholder="Payment Account Number"
                onChange={that.handleChanges}
              />
              <label className="text-danger form-invalid-feedback">
                {getErrorMessage("PAN")}
              </label>
            </div>
          </div>
          <div className="theRow">
            <textarea
              className="form-control"
              className={getFormClass("additionalMessage")}
              placeholder="Additional Message"
              onChange={that.handleChanges}
              rows="3"
            ></textarea>
          </div>
          <div className="theRow">
            <ItemsListForm
              action={this.handleItemsChange}
              items={this.state.items}
              errorMessage={this.state.errorMessage}
            />
          </div>

          <div className="buttonsRow">
            <Button
              variant="secondary"
              onClick={() => this.setWantsToLogIn(true)}
              id="buttonBlue"
            >
              Log-In Instead
            </Button>
            <Button variant="primary" type="submit" id="buttonBlue">
              <span id="submitText">Submit</span>
              <span id="goldenArrow">➤</span>
            </Button>
          </div>
        </Form>
        <br></br>
        <h2 className="smallVisaBlue">Response: {this.state.response}</h2>
        <h2 className="smallVisaBlue">Alias: {this.state.alias}</h2>
        <h2 className="smallVisaBlue">Message Box: {this.state.messageBox}</h2>
      </div>
    );
  }
}

export default MerchantInvoiceFull;
