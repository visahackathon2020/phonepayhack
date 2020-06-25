import React, { Component} from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


class MerchantLogin extends Component {
  constructor(props) {
    super(props)
    this.state={
        Response: "Not yet requested",
        Alias: "No alias generated",
        SpecialCode: "",
        MessageBox: ""
      }

  }



  render() {
    
    const that = this;
    return (
        <div className="MerchantLogin">
          <h2 class="VisaBlue">Login Page</h2>
            <Button variant="secondary" onClick={()=>that.props.action(true)} id="buttonBlue">
                Click to log in
            </Button>
        </div>  
        
      );
  }
}

export default MerchantLogin;