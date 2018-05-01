import uuid from 'uuid/v1';
import * as actionTypes from './actionTypes';

// uuid: {
//   order: 1,
//   kind: 'RADIO_LIST',
//   label: 'Color',
//   items: {},
// }

const defaultState = {
  formItems: {},
  formItemOrder: [],
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.ADD_FORM_ITEM: {
      const newState = { ...state };
      const id = uuid();

      newState.formItemOrder = [...newState.formItemOrder, id];

      newState.formItems = { ...newState.formItems };
      newState.formItems[id] = {
        kind: action.kind,
        label: action.label || '',
        items: action.items || {},
      };

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
    default: {
      return state;
    }
  }
}
