import React, { Component } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class FirstTimeMerchantForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Country: "",
      PAN: "",
      ZipCode: "",
      StateInUSA: "",
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handlePANChange = this.handlePANChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStateInUSAChange = this.handleStateInUSAChange.bind(this);
    this.handleZipCodeChange = this.handleZipCodeChange.bind(this);
    this.submitMerchantPayment = this.submitMerchantPayment.bind(this);
  }

  handleNameChange(e) {
    this.setState({ Name: e.target.value });
    this.props.onErrorMessageChange(
      this.props.ErrorMessage ? { ...this.props.ErrorMessage, name: "" } : null
    );
  }

  handleCountryChange(e) {
    this.setState({ Country: e.target.value });
    this.props.onErrorMessageChange(
      this.props.ErrorMessage
        ? { ...this.props.ErrorMessage, country: "" }
        : null
    );
  }

  handlePANChange(e) {
    this.setState({ PAN: e.target.value });
    this.props.onErrorMessageChange(
      this.props.ErrorMessage ? { ...this.props.ErrorMessage, PAN: "" } : null
    );
  }

  handleStateInUSAChange(e) {
    this.setState({ StateInUSA: e.target.value });
    this.props.onErrorMessageChange(
      this.props.ErrorMessage ? { ...this.props.ErrorMessage, state: "" } : null
    );
  }

  handleZipCodeChange(e) {
    this.setState({ ZipCode: e.target.value });
    this.props.onErrorMessageChange(
      this.props.ErrorMessage
        ? { ...this.props.ErrorMessage, zipcode: "" }
        : null
    );
  }

  submitMerchantPayment(myPostBody) {
    var url = "https://kylepence.dev:5000/merchants";

    var baseErrorMessage = {
      name: "",
      businessName: "",
      country: "",
      state: "",
      zipcode: "",
      PAN: "",
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(myPostBody),
      headers: { Authorization: this.state.IdToken },
    }).then((result) => {
      console.log(result);
      // do something with the result
      result.json().then((data) => {
        console.log(data);
        let errorMessage = null;
        if (data.status == "fail") {
          errorMessage = { ...baseErrorMessage, ...data.result.errorMessage };
        }
        this.setState({ ErrorMessage: errorMessage });
        if (data.status == "success") {
          this.setState({ FormInfoExists: true });
        }
      });
    });
  }

  handleSubmit(e) {
    var that = this;

    var myProps = {
      name: this.state.Name,
      country: "USA",
      state: this.state.StateInUSA,
      zipcode: this.state.ZipCode,
      PAN: this.state.PAN,
    };

    that.submitMerchantPayment(myProps);

    e.preventDefault();
  }

  render() {
    const that = this;
    // Do this for the form submission https://stackoverflow.com/questions/23427384/get-form-data-in-reactjs

    // Set the error field class names
    const getFormClass = (errMsg, errMsgField) => {
      return errMsg ? (errMsgField != "" ? "form-invalid-border" : "") : "";
    };
    const formNameClass = getFormClass(
      this.props.ErrorMessage,
      this.props.ErrorMessage ? this.props.ErrorMessage.name : null
    );
    const formCountryClass = getFormClass(
      this.props.ErrorMessage,
      this.props.ErrorMessage ? this.props.ErrorMessage.country : null
    );
    const formStateClass = getFormClass(
      this.props.ErrorMessage,
      this.props.ErrorMessage ? this.props.ErrorMessage.state : null
    );
    const formZipcodeClass = getFormClass(
      this.props.ErrorMessage,
      this.props.ErrorMessage ? this.props.ErrorMessage.zipcode : null
    );
    const formPANClass = getFormClass(
      this.props.ErrorMessage,
      this.props.ErrorMessage ? this.props.ErrorMessage.PAN : null
    );

    return (
      <div className="FirstTimeMerchantForm">
        <h2 class="VisaBlue">First Time Merchant Form</h2>
        <h2 class="VisaBlue">Create Merchant Account</h2>
        <Form onSubmit={that.handleSubmit}>
          <div className="theRow">
            <div className="form-field" id="rightMarg">
              <Form.Control
                className={formNameClass}
                placeholder="Merchant name"
                onChange={that.handleNameChange}
              />
              <label class="text-danger form-invalid-feedback">
                {this.props.ErrorMessage ? this.props.ErrorMessage.name[0] : ""}
              </label>
            </div>
            <Form.Control placeholder="Cardholder Name" id="leftMarg" />
          </div>
          <div className="theRow">
            <div className="form-field" id="rightMarg">
              <Form.Control
                className={formCountryClass}
                as="select"
                defaultValue="Choose..."
                onChange={that.handleCountryChange}
              >
                <option>Choose...</option>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Canada</option>
                <option>Mexico</option>
                <option>China</option>
              </Form.Control>
              <label class="text-danger form-invalid-feedback">
                {this.props.ErrorMessage
                  ? this.props.ErrorMessage.country[0]
                  : ""}
              </label>
            </div>
            <div className="form-field" id="leftMarg">
              <Form.Control
                className={formPANClass}
                type="password"
                placeholder="Payment Account Number"
                onChange={that.handlePANChange}
              />
              <label class="text-danger form-invalid-feedback">
                {this.props.ErrorMessage ? this.props.ErrorMessage.PAN[0] : ""}
              </label>
            </div>
          </div>
          <div className="theRow">
            <div className="form-field" id="rightMarg">
              <Form.Control
                className={formStateClass}
                placeholder="State"
                onChange={that.handleStateInUSAChange}
              />
              <label class="text-danger form-invalid-feedback">
                {this.props.ErrorMessage
                  ? this.props.ErrorMessage.state[0]
                  : ""}
              </label>
            </div>
            <div className="form-field" id="leftMarg">
              <Form.Control
                className={formZipcodeClass}
                placeholder="Zip Code"
                onChange={that.handleZipCodeChange}
              />
              <label class="text-danger form-invalid-feedback">
                {this.props.ErrorMessage
                  ? this.props.ErrorMessage.zipcode[0]
                  : ""}
              </label>
            </div>
          </div>
          <div className="buttonsRow">
            <Button variant="primary" type="submit" id="buttonBlue">
              <a id="submitText">Submit</a>
              <a id="goldenArrow"> {"➤"} </a>
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default FirstTimeMerchantForm;
