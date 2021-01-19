import {applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {userReducer} from './reducers/profile';
import {catalogReducer} from './reducers/catalog';
import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {favoritesReducer} from './reducers/favoritest';
import {cardReducer} from './reducers/card';
import {ordersReducer} from './reducers/orders';

const middlewares = [thunkMiddleware];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}
// @ts-ignore
const enhancers = applyMiddleware.apply({}, middlewares);

const appReducer = combineReducers({
  profile: userReducer,
  catalog: catalogReducer,
  favorites: favoritesReducer,
  card: cardReducer,
  orders: ordersReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, appReducer);
export type RootState = ReturnType<typeof appReducer>;
export default () => {
  let store = createStore(persistedReducer, enhancers);
  let persistor = persistStore(store);
  return {store, persistor};
};
