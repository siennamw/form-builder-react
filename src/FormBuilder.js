import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import * as actionCreators from './redux/actionCreators';
import FormControls from './FormControls';
import FormBuilderItems from './FormBuilderItems';

const FormBuilder = props => (
  <div className="container">
    <div className="seven columns">
      <FormBuilderItems
        formItems={props.formItems}
        formSubItems={props.formSubItems}
        formItemOrder={props.formItemOrder}
        updateFormItem={props.updateFormItem}
        removeFormItem={props.removeFormItem}
        addSubItem={props.addSubItem}
        updateSubItem={props.updateSubItem}
        removeSubItem={props.removeSubItem}
      />
    </div>
    <div className="five columns">
      <FormControls
        addFormItem={props.addFormItem}
        addSubItem={props.addSubItem}
      />
    </div>
  </div>
);

FormBuilder.propTypes = {
  formItems: propTypes.objectOf(propTypes.shape({
    kind: propTypes.string,
    label: propTypes.string,
    subItems: propTypes.arrayOf(propTypes.string),
  })),
  formSubItems: propTypes.objectOf(propTypes.shape({
    kind: propTypes.string,
    label: propTypes.string,
    value: propTypes.string,
    parentId: propTypes.string,
  })),
  formItemOrder: propTypes.arrayOf(propTypes.string),
  addFormItem: propTypes.func,
  updateFormItem: propTypes.func,
  removeFormItem: propTypes.func,
  addSubItem: propTypes.func,
  updateSubItem: propTypes.func,
  removeSubItem: propTypes.func,
};

FormBuilder.defaultProps = {
  formItems: {},
  formSubItems: {},
  formItemOrder: [],
  addFormItem: () => {},
  updateFormItem: () => {},
  removeFormItem: () => {},
  addSubItem: () => {},
  updateSubItem: () => {},
  removeSubItem: () => {},
};

const mapStateToProps = state => ({
  formItems: state.formItems,
  formSubItems: state.formSubItems,
  formItemOrder: state.formItemOrder,
});

const mapDispatchToProps = dispatch => ({
  addFormItem: (kind, label, subItems, id) => {
    dispatch(actionCreators.addFormItem(kind, label, subItems, id));
  },
  updateFormItem: (id, label, subItems) => {
    dispatch(actionCreators.updateFormItem(id, label, subItems));
  },
  removeFormItem: (id) => {
    dispatch(actionCreators.removeFormItem(id));
  },
  addSubItem: (parentId, kind, label, value, id) => {
    dispatch(actionCreators.addSubItem(parentId, kind, label, value, id));
  },
  updateSubItem: (id, label, value) => {
    dispatch(actionCreators.updateSubItem(id, label, value));
  },
  removeSubItem: (id) => {
    dispatch(actionCreators.removeSubItem(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FormBuilder);
