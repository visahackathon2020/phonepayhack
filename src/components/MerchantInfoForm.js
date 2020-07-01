import React, { Component } from "react";
import Cleave from "cleave.js/react";
import { Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import firebase from "firebase/app";
import "bootstrap/dist/css/bootstrap.min.css";

class MerchantInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idToken: "",
      name: "",
      country: "",
      PAN: "",
      zipCode: "",
      stateInUSA: "",
      errorMessage: null,
    };
    this.handleChanges = this.handleChanges.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let that = this;
    firebase
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then((idToken) => {
        // Send token to your backend via HTTPS
        that.setState({ idToken: idToken });
      })
      .catch(function (error) {
        // Handle error
        console.error(error);
      });
  }

  handleChanges(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const myPostBody = {
      name: this.state.name,
      country: "USA",
      state: this.state.stateInUSA,
      zipcode: this.state.zipCode,
      PAN: this.state.PAN.split(" ").join(""),
    };

    console.log("PAN", this.state.PAN.split(" ").join(""))

    const url = "https://kylepence.dev:5000/merchants";

    fetch(url, {
      method: "POST",
      body: JSON.stringify(myPostBody),
      headers: { Authorization: this.state.idToken },
    }).then((result) => {
      console.log(result);
      // do something with the result
      result.json().then((data) => {
        console.log(data);
        this.setState({ errorMessage: data.result.errorMessage || null }); //@TODO: Function to set error message in "MerchantLogin.js"
        if (data.status === "success") {
          this.props.history.push("/merchant");
        }
      });
    });
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

    return (
      <div className="FirstTimeMerchantForm">
        <h2 className="VisaBlue">Update Merchant Account Information</h2>
        <Form onSubmit={that.handleSubmit}>
          <div className="theRow">
            <div className="form-field" id="rightMarg">
              <Form.Control
                name="name"
                className={getFormClass("name")}
                placeholder="Merchant name"
                onChange={that.handleChanges}
              />
              <label className="text-danger form-invalid-feedback">
                {getErrorMessage("name")}
              </label>
            </div>
            <Form.Control placeholder="Cardholder Name" id="leftMarg" />
          </div>
          <div className="theRow">
            <div className="form-field" id="rightMarg">
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
            <div className="form-field" id="leftMarg">
              <Cleave
                className={`${getFormClass("PAN")} form-control`}
                name="PAN"
                placeholder="Payment Account Number"
                options={{ creditCard: true }}
                onChange={that.handleChanges}
              />
              <label className="text-danger form-invalid-feedback">
                {getErrorMessage("PAN")}
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
                name="zipCode"
                placeholder="Zip Code"
                onChange={that.handleChanges}
              />
              <label className="text-danger form-invalid-feedback">
                {getErrorMessage("zipcode")}
              </label>
            </div>
          </div>
          <div className="buttonsRow">
            <Button variant="primary" type="submit" id="buttonBlue">
              <span id="submitText">Submit</span>
              <span id="goldenArrow">➤</span>
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default withRouter(MerchantInfoForm);
