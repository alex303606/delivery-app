import axios from 'axios';
import {GET_FAVORITES} from './actionTypes';
import {getProducts} from '@actions';
import {IProduct} from '../reducers/favoritest';

export const getFavorites = () => {
  return (dispatch: any, getState: any) => {
    const store = getState();
    const params = {
      TYPE: 'get_favorite',
      USER_ID: store.profile.user_id,
    };
    return axios
      .post('', params)
      .then((response) => {
        if (response && response.data) {
          if (response.data.result && response.data.data) {
            dispatch(getProducts({id: response.data.data})).then(
              (data: IProduct[]) => {
                dispatch(getFavoritesSuccess(data));
              },
            );
          }
        }
      })
      .catch((error) => console.log(error));
  };
};

const getFavoritesSuccess = (favorites: IProduct[]) => {
  return {type: GET_FAVORITES, favorites};
};

export const deleteFavorite = (id: string) => {
  return (dispatch: any, getState: any) => {
    const store = getState();
    const params = {
      TYPE: 'delete_favorite',
      USER_ID: store.profile.user_id,
      PRODUCT_ID: id,
    };
    return axios
      .post('', params)
      .then((response) => {
        if (response && response.data && response.data.result) {
          dispatch(getFavorites());
        }
      })
      .catch((error) => console.log(error));
  };
};
