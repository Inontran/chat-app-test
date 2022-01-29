import { 
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';
import thunkMiddleWare from 'redux-thunk';

import authReducer from './reducers/auth-reducer/auth-reducer';
import appReducer from './reducers/app-reducer/app-reducer';

const reducers = combineReducers({
  auth: authReducer,
  app: appReducer,
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
  applyMiddleware(thunkMiddleWare)
));

export default store;
