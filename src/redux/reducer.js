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
  formSubItems: {},
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
      const subItems = newState.formItems[action.id].subItems;
      delete newState.formItems[action.id];

      newState.formItemOrder = newState.formItemOrder.filter(id => (
        id !== action.id
      ));

      newState.formSubItems = { ...newState.formSubItems };
      subItems.forEach((id) => {
        delete newState.formSubItems[id];
      });

      return newState;
    }
    case actionTypes.ADD_SUB_ITEM: {
      const newState = { ...state };
      const id = action.id || uuid();

      newState.formSubItems = { ...newState.formSubItems };
      newState.formSubItems[id] = {
        kind: action.kind,
        label: action.label || '',
        value: action.value || '',
        parentId: action.parentId,
      };

      if (newState.formItems[action.parentId] &&
        !newState.formItems[action.parentId].subItems.includes(id)) {
        newState.formItems[action.parentId].subItems = [
          ...newState.formItems[action.parentId].subItems,
          id,
        ];
      }

      return newState;
    }
    case actionTypes.UPDATE_SUB_ITEM: {
      const newState = { ...state };

      newState.formSubItems = { ...newState.formSubItems };

      if (action.label !== undefined) {
        newState.formSubItems[action.id].label = action.label;
      }

      if (action.value !== undefined) {
        newState.formSubItems[action.id].value = action.value;
      }

      return newState;
    }
    case actionTypes.REMOVE_SUB_ITEM: {
      const newState = { ...state };

      newState.formSubItems = { ...newState.formSubItems };

      const parent = newState.formSubItems[action.id].parentId;

      delete newState.formSubItems[action.id];

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
