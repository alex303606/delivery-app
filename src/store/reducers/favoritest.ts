import {GET_FAVORITES, SIGN_OUT} from '../actions/actionTypes';

export interface IProduct {
  ID: string;
  IS_ACTIVE: boolean;
  IS_NEW: boolean;
  IS_SALE: boolean;
  NAME: string;
  PICTURES: string[];
  PRICE: string;
  SECTION_ID: string;
  TEXT: string;
}

export interface IFavoritesState {
  favorites: IProduct[];
}

const initialState: IFavoritesState = {
  favorites: [],
};

export const favoritesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_FAVORITES:
      return {...state, favorites: action.favorites};
    case SIGN_OUT:
      return initialState;
    default:
      return state;
  }
};
