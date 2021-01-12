import {IProduct} from '../reducers/card';
import {ADD_TO_CARD, DELETE_FROM_CARD} from './actionTypes';

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
