import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';

import reducer from './reducer';

const logger = createLogger({
  collapsed: true,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(logger)),
);

export default store;
