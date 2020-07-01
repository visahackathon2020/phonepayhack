import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from 'react-bootstrap/Table'

class ConsumerItemListForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      html : "",
      sum : null
    };
  }

  getSum() {
    var total = 0;
    console.log(this.props.items);
    if(this.props.items !== null) {
      console.log("here!");
      this.props.items.forEach((item, i) => {
        total += item.amount;
        console.log(total);
      });
    }
    this.setState({sum : total});
    console.log(total);
  }

  render() {
    if (this.state.sum === null) {
      this.getSum();
    }
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
        {itemList.map((_, item) =>
          <tr>
            <td>{this.props.items[item].desc}</td>
            <td>${this.props.items[item].amount}</td>
          </tr>
        )}
          <tr>
            <td>Total</td>
            <td>{this.state.sum}</td>
          </tr>
        </tbody>
      </Table>
    )
  }

}

export default ConsumerItemListForm;
