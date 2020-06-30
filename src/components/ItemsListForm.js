import React, { Component} from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


class ItemsListForm extends Component {
  constructor(props) {
    super(props)
    this.handleAmtChange = this.handleAmtChange.bind(this)
    this.handleDescChange = this.handleDescChange.bind(this)
    this.handleRemoveItem = this.handleRemoveItem.bind(this)
    this.handleAddNewItem = this.handleAddNewItem.bind(this)
  }

  handleAmtChange(item) {
    return (e) => {
      let items = this.props.Items;
      items[item].amount = e.target.value;
      this.props.action(items);
    }
  }

  handleDescChange(item) {
    return (e) => {
      let items = this.props.Items;
      items[item].desc = e.target.value;
      this.props.action(items);
    }
  }

  handleRemoveItem(item) {
    return (e) => {
      let items = this.props.Items;
      console.log('remove test', this.props.Items, item)
      items.splice(item,1);
      console.log('remove test AFTER', this.props.Items, item)
      this.props.action(items);
    }
  }

  handleAddNewItem(e){
    let items = this.props.Items;
    items.push({amount: '', desc: ''});
    console.log('result of addnewitem', items)
    this.props.action(items);
  }


  render() {
    // Set the error field class names
    const getFormClass = (item, field) => {
      if (!this.props.ErrorMessage || !this.props.ErrorMessage.items || !this.props.ErrorMessage.items[item])
        return ''
      if (!this.props.ErrorMessage.items[item][field])
        return ''
      return 'form-invalid-border'
    }
    const getErrorMessage = (item, field) => {
      if (!this.props.ErrorMessage || !this.props.ErrorMessage.items || !this.props.ErrorMessage.items[item])
        return ''
      return this.props.ErrorMessage.items[item][field] || ''
    }
    const items = this.props.Items || []
    console.log(this.props.ErrorMessage)
    
    return (
        <div className="ItemsListForm">
          {items.map((_, item) => (
            <div>
              <div id="invoiceRow">
                <div className="form-field" id="rightMargItems">
                  <Form.Control className={getFormClass(item,'desc')} placeholder="Item Description" onChange={this.handleDescChange(item)} value={this.props.Items[item].desc}/>
                  <label class="text-danger form-invalid-feedback">{getErrorMessage(item,'desc')[0]}</label>
                </div>
                <div className="form-field" id="leftMargItems">
                  <Form.Control className={getFormClass(item,'amount')} placeholder="Item Amount" onChange={this.handleAmtChange(item)} value={this.props.Items[item].amount}/>         
                  <label class="text-danger form-invalid-feedback">{getErrorMessage(item,'amount')[0]}</label>
                </div>
                {(items.length > 1) ?
                  <div className="buttonsRow">
                      <Button variant="primary" id="buttonBlue" onClick={this.handleRemoveItem(item)}>
                        Remove
                      </Button>
                  </div>
                  : <div></div>}
              </div>
            </div>
          ))}
          
              <Button variant="primary" id="buttonBlueNoLeftMarg" onClick={this.handleAddNewItem}>
                +
              </Button>
          
        </div>  
        
      );
  }
}

export default ItemsListForm;
