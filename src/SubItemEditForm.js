import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class SubItemEditForm extends Component {
  state = {
    label: '',
    value: ''
  };

  componentDidMount() {
    this.setState({
      label: this.props.label,
      value: this.props.value,
    });
  }

  handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    const newState = { ...this.state };
    newState[key] = value;
    this.setState(newState);
  };

  handleBlur = (e) => {
    this.props.updateSubItem(this.props.id, this.state.label, this.state.value);
  };

  handleRemove = (e) => {
    e.preventDefault();
    this.props.removeSubItem(this.props.id);
  };

  render() {
    return (
      <div className="sub-item-edit-form row">
        <div className="five columns">
          <label>
            Label
          </label>
          <input
            className="u-full-width"
            name="label"
            type="text"
            value={this.state.label}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
        </div>
        <div className="five columns">
          <label>
            Value
          </label>
          <input
            className="u-full-width"
            name="value"
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
        </div>
        <div className="two columns">
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

SubItemEditForm.propTypes = {
  id: propTypes.string,
  label: propTypes.string,
  value: propTypes.string,
  parentId: propTypes.string,
  addSubItem: propTypes.func,
  updateSubItem: propTypes.func,
  removeSubItem: propTypes.func,
};

SubItemEditForm.defaultProps = {
  id: '',
  label: '',
  value: '',
  parentId: '',
  addSubItem: () => {},
  updateSubItem: () => {},
  removeSubItem: () => {},
};
