import React, { Component} from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


class ConsumerForm extends Component {
  constructor(props) {
    super(props)
    this.state={
        mainArray:
        ["hello", "wow", "haha", "xd" ]
      }
  }
  render() {
    return (
        <div className="ConsumerForm">
          <h1>Consumer Information Form</h1>
          <Form>
          <Row>
              <Col>
                <Form.Control placeholder="First name" />
              </Col>
              <Col>
                <Form.Control placeholder="Last name" />
              </Col>
            </Row>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>

        </div>  
        
      );
  }
}

export default ConsumerForm;