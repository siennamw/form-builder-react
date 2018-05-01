import uuid from 'uuid/v1';
import * as actionTypes from './actionTypes';

// uuid: {
//   position: 1,
//   kind: 'RADIO_LIST',
//   label: 'Color',
//   items: {},
// }

const defaultState = {
  nextPosition: 0,
  formItems: {},
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.ADD_FORM_ITEM: {
      const newState = { ...state };
      newState.formItems = { ...newState.formItems };

      newState.formItems[uuid()] = {
        position: newState.nextPosition,
        kind: action.kind,
        label: action.label || '',
        items: action.items || {},
      };

      newState.nextPosition += 1;
      return newState;
    }
    case actionTypes.REMOVE_FORM_ITEM: {
      const newState = { ...state };
      newState.formItems = { ...newState.formItems };

      delete newState.formItems[action.id];

      return newState;
    }
    default: {
      return state;
    }
  }
}
