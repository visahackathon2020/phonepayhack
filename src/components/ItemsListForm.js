import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class ItemsListForm extends Component {
  constructor(props) {
    super(props);
    this.handleAmtChange = this.handleAmtChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleAddNewItem = this.handleAddNewItem.bind(this);
  }

  handleAmtChange(item) {
    return (e) => {
      let items = this.props.items;
      items[item].amount = e.target.value;
      this.props.action(items);
    };
  }

  handleDescChange(item) {
    return (e) => {
      let items = this.props.items;
      items[item].desc = e.target.value;
      this.props.action(items);
    };
  }

  handleRemoveItem(item) {
    return (e) => {
      let items = this.props.items;
      items.splice(item, 1);
      this.props.action(items);
    };
  }

  handleAddNewItem(e) {
    let items = this.props.items;
    items.push({ amount: "", desc: "" });
    console.log("result of addnewitem", items);
    this.props.action(items);
  }

  render() {
    // Set the error field class names
    const getFormClass = (item, field) => {
      if (
        !this.props.errorMessage ||
        !this.props.errorMessage.items ||
        !this.props.errorMessage.items[item]
      )
        return "";
      if (!this.props.errorMessage.items[item][field]) return "";
      return "form-invalid-border";
    };
    const geterrorMessage = (item, field) => {
      if (
        !this.props.errorMessage ||
        !this.props.errorMessage.items ||
        !this.props.errorMessage.items[item]
      )
        return "";
      return this.props.errorMessage.items[item][field] || "";
    };
    const items = this.props.items || [];
    console.log(this.props.errorMessage);

    return (
      <div className="itemsListForm">
        {items.map((_, item) => (
          <div key={_}>
            <div id="invoiceRow">
              <div className="form-field" id="rightMarg">
                <Form.Control
                  className={getFormClass(item, "desc")}
                  placeholder="Item Description"
                  onChange={this.handleDescChange(item)}
                  value={this.props.items[item].desc}
                  style={{ width: "200%" }}
                />
                <label className="text-danger form-invalid-feedback">
                  {geterrorMessage(item, "desc")[0]}
                </label>
              </div>
              <div style={{ height: "2px" }} />
              <div
                className="form-field"
                id="leftMarg"
                style={{ margin: "0px" }}
              >
                <Form.Control
                  className={getFormClass(item, "amount")}
                  placeholder="Item Amount"
                  onChange={this.handleAmtChange(item)}
                  value={this.props.items[item].amount}
                  style={{ width: "200%" }}
                />
                <label className="text-danger form-invalid-feedback">
                  {geterrorMessage(item, "amount")[0]}
                </label>
              </div>
              {items.length > 1 ? (
                <div className="buttonsRow">
                  <Button
                    variant="primary"
                    id="buttonBlue"
                    onClick={this.handleRemoveItem(item)}
                  >
                    - Remove Item
                  </Button>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        ))}
        <div className="buttonsRow">
          <Button
            variant="primary"
            id="buttonBlue"
            onClick={this.handleAddNewItem}
          >
            + Add Item
          </Button>
        </div>
      </div>
    );
  }
}

export default ItemsListForm;
