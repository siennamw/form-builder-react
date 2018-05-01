import React, { Component } from 'react';
import propTypes from 'prop-types';

import SubItemEditForm from './SubItemEditForm';
import * as constants from './constants';

export default class ItemEditForm extends Component {
  state = {
    label: '',
  };

  componentDidMount() {
    this.setState({ label: this.props.formItems[this.props.id].label });
  }

  handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    const newState = { ...this.state };
    newState[key] = value;
    this.setState(newState);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.updateFormItem(this.props.id, this.state.label);
  };

  handleNewSubItem = (e) => {
    e.preventDefault();
    const kind = this.props.formItems[this.props.id].kind === constants.RADIO_LIST ?
      constants.RADIO_SUB_ITEM : constants.DROPDOWN_SUB_ITEM;
    this.props.addSubItem(this.props.id, kind);
  };

  render() {
    const subItemFields = this.props.formItems[this.props.id].subItems.map((id) => {
      if (this.props.formSubItems[id]) {
        return (
          <SubItemEditForm
            key={id}
            id={id}
            label={this.props.formSubItems[id].label}
            value={this.props.formSubItems[id].value}
            parentId={this.props.formSubItems[id].parentId}
            addSubItem={this.props.addSubItem}
            updateSubItem={this.props.updateSubItem}
            removeSubItem={this.props.removeSubItem}
          />
        );
      }
      return undefined;
    });

    if (this.props.formItems[this.props.id].kind === constants.DROPDOWN_LIST ||
      this.props.formItems[this.props.id].kind === constants.RADIO_LIST) {
      subItemFields.unshift(
        <button key='new-sub-item-button' onClick={this.handleNewSubItem}>
          Add New Sub-Item
        </button>
      );
    }

    return (
      <div className="item-edit-overlay">
        <div className="item-edit-form">
          <label className="u-full-width">
            Label
          </label>
          <input
            className="u-full-width"
            name="label"
            autoFocus
            type="text"
            value={this.state.label}
            onChange={this.handleChange}
            onBlur={this.handleSubmit}
          />
          <button onClick={this.props.closeForm}>Done</button>
          {subItemFields}
        </div>
      </div>
    );
  }
}

ItemEditForm.propTypes = {
  id: propTypes.string,
  formItems: propTypes.object,
  formSubItems: propTypes.object,
  updateFormItem: propTypes.func,
  addSubItem: propTypes.func,
  updateSubItem: propTypes.func,
  removeSubItem: propTypes.func,
  closeForm: propTypes.func,
};

ItemEditForm.defaultProps = {
  id: '',
  formItems: {},
  formSubItems: {},
  updateFormItem: () => {},
  addSubItem: () => {},
  updateSubItem: () => {},
  removeSubItem: () => {},
  closeForm: () => {},
};
