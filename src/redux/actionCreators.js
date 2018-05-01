import * as actionTypes from './actionTypes';

export const addFormItem = (kind, label, subItems, id) => ({
  id,
  kind,
  label,
  subItems,
  type: actionTypes.ADD_FORM_ITEM,
});

export const updateFormItem = (id, label, subItems) => ({
  id,
  label,
  subItems,
  type: actionTypes.UPDATE_FORM_ITEM,
});

export const removeFormItem = id => ({
  id,
  type: actionTypes.REMOVE_FORM_ITEM,
});

export const addSubItem = (parentId, kind, label, value, id) => ({
  id,
  parentId,
  kind,
  label,
  value,
  type: actionTypes.ADD_SUB_ITEM,
});

export const updateSubItem = (id, label, value) => ({
  id,
  label,
  value,
});

export const removeSubItem = (id, label, value) => ({
  id,
  label,
  value,
});
