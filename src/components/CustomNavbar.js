import React, {Component} from 'react';
import {Nav, Navbar} from 'react-bootstrap';

class CustomNavbar extends Component{
    constructor(props) {
      super(props)
    
      this.state={
          
        }
    }
  
    render(){
      return (
        <div>
        <Navbar className="navBlue">
              <Navbar.Brand><img src="https://cdn.visa.com/cdn/assets/images/logos/visa/logo.png" className="visaLogo"></img></Navbar.Brand>
              <Nav className="navBlue" id="navOptions">
                <Nav.Link  className="navText" onClick={() =>this.props.action("consumer")}>Consumer</Nav.Link>
                <Nav.Link  className="navText" onClick={() =>this.props.action("merchant")}>Merchant</Nav.Link>
              </Nav>
            </Navbar>
        <div id="indicatorStripe"></div>
        </div>

      )
    }
  }

  export default CustomNavbar