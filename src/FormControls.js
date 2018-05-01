import React, { Component } from 'react';
import propTypes from 'prop-types';
import uuid from 'uuid/v1';

import * as constants from './constants';

class FormControls extends Component {
  handleTextField = () => {
    this.props.addFormItem(constants.TEXT_FIELD, 'Text Field')
  };

  handleRadioList = () => {
    const parentId = uuid();
    const childId = uuid();
    this.props.addFormItem(constants.RADIO_LIST, 'Radio List', [childId], parentId);
    this.props.addSubItem(parentId, constants.RADIO_SUB_ITEM, 'Radio item 1', 'radio-item-1', childId);
  };

  handleDropdownList = () => {
    const parentId = uuid();
    const childId = uuid();
    this.props.addFormItem(constants.DROPDOWN_LIST, 'Dropdown List', [childId], parentId);
    this.props.addSubItem(parentId, constants.DROPDOWN_SUB_ITEM, 'Dropdown item 1', 'dropdown-item-1', childId);
  };

  handleSubmitButton = () => {
    this.props.addFormItem(constants.SUBMIT_BUTTON, 'Submit')
  };

  render() {
    return (
      <div id="form-controls">
        <button className="u-full-width" onClick={this.handleTextField}>
          Add Text Field
        </button>
        <button className="u-full-width" onClick={this.handleRadioList}>
          Add Radio List
        </button>
        <button className="u-full-width" onClick={this.handleDropdownList}>
          Add Dropdown List
        </button>
        <button className="u-full-width" onClick={this.handleSubmitButton}>
          Add Submit Button
        </button>
      </div>
    );
  }
}

FormControls.propTypes = {
  addFormItem: propTypes.func,
  addSubItem: propTypes.func
};

FormControls.defaultProps = {
  addFormItem: () => {},
  addSubItem: () => {},
};

export default FormControls;
