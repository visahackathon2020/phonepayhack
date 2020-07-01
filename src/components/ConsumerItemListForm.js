import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from 'react-bootstrap/Table'

class ConsumerItemListForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      html : "",
    };
  }

  render() {
    const itemList = this.props.items || [];
    console.log("ConsumerItemListForm", this.props.items)
    return (
      <Table bordered hover>
        <thead>
          <tr>
            <th>Item Description</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
        {itemList.map((_, item) =>
          <tr>
            <td>{this.props.items[item].desc}</td>
            <td>${this.props.items[item].amount}</td>
          </tr>
        )}
          <tr>
            <td>Total</td>
            <td>{this.props.items.reduce((item) => { item.amount })}</td>
          </tr>
        </tbody>
      </Table>
    )
  }

}

export default ConsumerItemListForm;
