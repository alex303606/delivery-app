import {applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {userReducer} from './reducers/profile';
import {catalogReducer} from './reducers/catalog';
import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const middlewares = [thunkMiddleware];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}
const enhancers = applyMiddleware.apply({}, middlewares);

const appReducer = combineReducers({
  profile: userReducer,
  catalog: catalogReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export default () => {
  let store = createStore(persistedReducer, enhancers);
  let persistor = persistStore(store);
  return {store, persistor};
};
