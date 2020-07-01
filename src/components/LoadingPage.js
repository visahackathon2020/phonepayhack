import React, { Component } from "react";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class LoadingPage extends Component {
  render() {
    return (
      <div className="LoadingPage" id="header">
        <h2 className="VisaBlue">Loading ...</h2>
        <Spinner animation="border" />
      </div>
    );
  }
}

export default LoadingPage;
