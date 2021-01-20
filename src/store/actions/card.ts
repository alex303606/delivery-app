import {IProduct} from '../reducers/card';
import {
  ADD_TO_CARD,
  DELETE_FROM_CARD,
  DECREMENT_FROM_CARD,
  CLEAR_CARD,
  GET_ORDERS,
} from './actionTypes';
import axios from 'axios';

export const addToCard = (item: IProduct) => {
  return (dispatch: any) => {
    return dispatch({type: ADD_TO_CARD, item});
  };
};

export const deleteFromCard = (id: string) => {
  return (dispatch: any) => {
    return dispatch({type: DELETE_FROM_CARD, id});
  };
};

export const decrementProduct = (item: IProduct) => {
  return (dispatch: any) => {
    return dispatch({type: DECREMENT_FROM_CARD, item});
  };
};

export const clearCard = () => {
  return (dispatch: any) => {
    return dispatch({type: CLEAR_CARD});
  };
};

export const newOrder = (comment?: string) => {
  return (dispatch: any, getState: any) => {
    const store = getState();
    const products = store.card.productsInCard
      .filter((x: IProduct) => x.count > 0)
      .reduce((acc: any, p: IProduct) => {
        acc[p.ID] = p.count;
        return acc;
      }, {});
    const params = {
      TYPE: 'new_order',
      USER_ID: store.profile.user_id,
      CITY: store.profile.city,
      COMMENT: comment || '',
      PRODUCTS: products,
    };

    return axios
      .post('', params)
      .then((response) => {
        if (response && response.data) {
          return response.data;
        }
      })
      .catch((error) => console.log(error));
  };
};

export const getOrders = () => {
  return (dispatch: any, getState: any) => {
    const store = getState();
    const params = {
      TYPE: 'get_orders',
      USER_IDS: [store.profile.user_id],
      STATUS: ['N', 'S', 'Y', 'C'],
      PAGE_SIZE: 0,
    };
    return axios
      .post('', params)
      .then((response) => {
        if (response && response.data && response.data.result) {
          return dispatch({type: GET_ORDERS, orders: response.data.data});
        }
      })
      .catch((error) => console.log(error));
  };
};
