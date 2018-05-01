import * as actionTypes from './actionTypes';

export const addFormItem = (kind, label, items) => ({
  kind,
  label,
  items,
  type: actionTypes.ADD_FORM_ITEM,
});

export const removeFormItem = id => ({
  id,
  type: actionTypes.REMOVE_FORM_ITEM,
});
