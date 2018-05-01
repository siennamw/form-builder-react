import React, { Component } from 'react';
import propTypes from 'prop-types';

import * as constants from './constants';
import FormBuilderItem from './FormBuilderItem';
import ItemEditForm from './ItemEditForm';

class FormBuilderItems extends Component {
  state = {
    editing: false,
    idOfItemBeingEdited: null,
  };

  handleEdit = (e) => {
    e.preventDefault();
    const id = e.target.id;
    this.setState({
      editing: true,
      idOfItemBeingEdited: id,
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
            <div>
              <label htmlFor={id}>
                {item.label}
              </label>
              <input className="u-full-width" type="text" name={id} />
            </div>
          );
          break;
        }
        case constants.DROPDOWN_LIST: {
          if (item.subItems) {
            subItems = item.subItems.map((subId) => {
              subItem = this.props.formSubItems[subId];
              return (
                <option key={subId} value={subItem.value}>
                  {subItem.label}
                </option>
              );
            });
          }
          element = (
            <div>
              <label htmlFor={id}>
                {item.label}
              </label>
              <select className="u-full-width" name={id}>
                {subItems}
              </select>
            </div>
          );
          break;
        }
        case constants.RADIO_LIST: {
          if (item.subItems) {
            subItems = item.subItems.map((subId) => {
              subItem = this.props.formSubItems[subId];
              return (
                <label key={subId} className="u-full-width">
                  <input type="radio" name={id} value={subItem.value} />
                  {subItem.label}
                </label>
              );
            });
          }
          element = (
            <div>
              <label htmlFor={id}>
                {item.label}
              </label>
              {subItems}
            </div>
          );
          break;
        }
        case constants.SUBMIT_BUTTON: {
          element = (
            <button
              className="u-full-width"
              onClick={(e) => {
                e.preventDefault();
              }}>
              {item.label}
            </button>
          );
          break;
        }
        default: {
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
        <div>
          {result.length > 0 ? result :
            <h4 className="align-center">Use the buttons to build your
              form</h4>}
        </div>
        {this.state.editing ?
          <ItemEditForm
            id={this.state.idOfItemBeingEdited}
            formItems={this.props.formItems}
            formSubItems={this.props.formSubItems}
            updateFormItem={this.props.updateFormItem}
            addSubItem={this.props.addSubItem}
            updateSubItem={this.props.updateSubItem}
            removeSubItem={this.props.removeSubItem}
            closeForm={this.closeForm}
          />
          : undefined}
      </div>
    );
  }
}

FormBuilderItems.propTypes = {
  formItems: propTypes.object,
  formSubItems: propTypes.object,
  formItemOrder: propTypes.arrayOf(propTypes.string),
  updateFormItem: propTypes.func,
  removeFormItem: propTypes.func,
  addSubItem: propTypes.func,
  updateSubItem: propTypes.func,
  removeSubItem: propTypes.func,
};

FormBuilderItems.defaultProps = {
  formItems: {},
  formSubItems: {},
  formItemOrder: [],
  updateFormItem: () => {},
  removeFormItem: () => {},
  addSubItem: () => {},
  updateSubItem: () => {},
  removeSubItem: () => {},
};

export default FormBuilderItems;
