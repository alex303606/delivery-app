import {GET_FAVORITES} from '../actions/actionTypes';

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
    default:
      return state;
  }
};
