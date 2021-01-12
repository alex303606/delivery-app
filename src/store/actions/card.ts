import {IProduct} from '../reducers/card';
import {ADD_TO_CARD} from './actionTypes';

export const addToCard = (item: IProduct) => {
  return (dispatch: any) => {
    return dispatch({type: ADD_TO_CARD, item});
  };
};
