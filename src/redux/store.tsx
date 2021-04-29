import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from './reducers';
import thunk from 'redux-thunk';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(thunk);

export const store = createStore(rootReducer, composeEnhancers(middleware));
