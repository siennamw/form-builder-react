import uuid from 'uuid/v1';
import * as actionTypes from './actionTypes';

// uuid: {
//   kind: 'RADIO_LIST',
//   label: 'Color',
//   subItems: [
//      uuids
//   ],
// }

const defaultState = {
  formItems: {},
  formItemOrder: [],
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.ADD_FORM_ITEM: {
      const newState = { ...state };
      const id = action.id || uuid();

      newState.formItemOrder = [...newState.formItemOrder, id];

      newState.formItems = { ...newState.formItems };
      newState.formItems[id] = {
        kind: action.kind,
        label: action.label || '',
        subItems: action.subItems || [],
      };

      return newState;
    }
    case actionTypes.UPDATE_FORM_ITEM: {
      const newState = { ...state };
      newState.formItems[action.id] = { ...newState.formItems[action.id] };

      if (action.label !== undefined) {
        newState.formItems[action.id].label = action.label;
      }

      if (action.subItems !== undefined) {
        newState.formItems[action.id].subItems = action.subItems;
      }

      return newState;
    }
    case actionTypes.REMOVE_FORM_ITEM: {
      const newState = { ...state };

      newState.formItems = { ...newState.formItems };
      delete newState.formItems[action.id];

      newState.formItemOrder = newState.formItemOrder.filter(id => (
        id !== action.id
      ));

      return newState;
    }
    case actionTypes.ADD_SUB_ITEM: {
      const newState = { ...state };
      const id = action.id || uuid();

      newState.formItems = { ...newState.formItems };
      newState.formItems[id] = {
        kind: action.kind,
        label: action.label || '',
        value: action.value || '',
        parentId: action.parentId,
      };

      newState.formItems.subItems.push(id);

      return newState;
    }
    case actionTypes.UPDATE_SUB_ITEM: {
      const newState = { ...state };

      newState.formItems = { ...newState.formItems };

      if (action.label !== undefined) {
        newState.formItems[action.id].label = action.label;
      }

      if (action.value !== undefined) {
        newState.formItems[action.id].value = action.value;
      }

      return newState;
    }
    case actionTypes.REMOVE_SUB_ITEM: {
      const newState = { ...state };

      newState.formItems = { ...newState.formItems };

      const parent = newState.formItems[action.id].parentId;

      delete newState.formItems[action.id];

      // remove subItem from parent list
      newState.formItems[parent] = { ...newState.formItems[parent] };
      newState.formItems[parent].subItems = newState.formItems[parent].subItems.filter(id => (
        id !== action.id
      ));

      return newState;
    }


    default: {
      return state;
    }
  }
}
