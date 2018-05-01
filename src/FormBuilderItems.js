import React, { Component } from 'react';
import propTypes from 'prop-types';

import * as constants from './constants';
import FormBuilderItem from './FormBuilderItem';
import ItemEditForm from './ItemEditForm';

class FormBuilderItems extends Component {
  state = {
    editing: false,
    idOfItemBeingEdited: null,
    itemBeingEdited: null,
  };

  handleEdit = (e) => {
    e.preventDefault();
    const id = e.target.id;
    this.setState({
      editing: true,
      idOfItemBeingEdited: id,
      itemBeingEdited: this.props.formItems[id],
    });
  };

  closeForm = () => {
    this.setState({ editing: false });
  };

  render() {
    const result = [];
    let item;
    let element;
    let subItems;
    let subItem;

    this.props.formItemOrder.forEach((id) => {
      element = null;
      item = this.props.formItems[id];
      subItems = [];

      switch (item.kind) {
        case constants.TEXT_FIELD: {
          element = (
            <label htmlFor={id}>
              {item.label}
              <input type="text" name={id} />
            </label>
          );
          break;
        }
        case constants.DROPDOWN_LIST: {
          if (item.subItems) {
            subItems = item.subItems.map((subId) => {
              subItem = this.props.formSubItems[subId];
              return (
                <option key={subItem.id} value={subItem.value}>
                  {subItem.label}
                </option>
              );
            });
          }
          element = (
            <label htmlFor={id}>
              {item.label}
              <select name={id}>
                {subItems}
              </select>
            </label>
          );
          break;
        }
        case constants.RADIO_LIST: {
          if (item.subItems) {
            subItems = item.subItems.map((subId) => {
              subItem = this.props.formSubItems[subId];
              return (
                <label key={subItem.id}>
                  <input type="radio" name={id} value={subItem.value} />
                  {subItem.label}
                </label>
              );
            });
          }
          element = (
            <label htmlFor={id}>
              {item.label}
              {subItems}
            </label>
          );
          break;
        }
        case constants.SUBMIT_BUTTON: {
          element = (
            <button onClick={(e) => {e.preventDefault();}}>
              {item.label}
            </button>
          );
          break;
        }
      }

      element = (
        <FormBuilderItem
          key={id}
          id={id}
          handleEdit={this.handleEdit}
          removeFormItem={this.props.removeFormItem}
        >
          {element}
        </FormBuilderItem>
      );

      result.push(element);
    });

    return (
      <div>
        {this.state.editing ?
          <ItemEditForm
            id={this.state.idOfItemBeingEdited}
            item={this.state.itemBeingEdited}
            updateFormItem={this.props.updateFormItem}
            addSubItem={this.props.addSubItem}
            updateSubItem={this.props.updateSubItem}
            removeSubItem={this.props.removeSubItem}
            closeForm={this.closeForm}
          />
          : undefined}
        <h2>Form Items</h2>
        <form>
          {result}
        </form>
      </div>
    );
  }
}

FormBuilderItems.propTypes = {
  formItems: propTypes.object,
  formItemOrder: propTypes.arrayOf(propTypes.string),
  updateFormItem: propTypes.func,
  removeFormItem: propTypes.func,
  addSubItem: propTypes.func,
  updateSubItem: propTypes.func,
  removeSubItem: propTypes.func,
};

FormBuilderItems.defaultProps = {
  formItems: {},
  formItemOrder: [],
  updateFormItem: () => {},
  removeFormItem: () => {},
  addSubItem: () => {},
  updateSubItem: () => {},
  removeSubItem: () => {},
};

export default FormBuilderItems;
