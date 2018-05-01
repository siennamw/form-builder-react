import React, { Component } from 'react';
import propTypes from 'prop-types';

class FormBuilderItem extends Component {
  handleRemove = (e) => {
    e.preventDefault();
    this.props.removeFormItem(this.props.id);
  };

  render() {
    return (
      <div className="form-item">
        {this.props.children}
        <div className="form-item-controls">
          <button
            className='form-item-update'
            onClick={this.props.handleEdit}
            title="edit"
            id={this.props.id}
          >
            &#9998;
          </button>
          <button
            className='form-item-remove'
            onClick={this.handleRemove}
            title="remove"
          >
            &#10006;
          </button>
        </div>
      </div>
    );
  }
}

FormBuilderItem.propTypes = {
  id: propTypes.string.isRequired,
  handleEdit: propTypes.func.isRequired,
  removeFormItem: propTypes.func.isRequired,
};

export default FormBuilderItem;
