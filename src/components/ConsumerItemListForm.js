import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";

class ConsumerItemListForm extends Component {
  render() {
    const itemList = this.props.items || [];
    return (
      <Table bordered hover>
        <thead>
          <tr>
            <th>Item Description</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {itemList.map((_, item) => (
            <tr>
              <td>{this.props.items[item].desc}</td>
              <td>${this.props.items[item].amount.toFixed(2)}</td>
            </tr>
          ))}
          <tr style={{ background: "#ECECEC" }}>
            <td>Total</td>
            <td>${parseFloat(this.props.orderPrice).toFixed(2)}</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

export default ConsumerItemListForm;
