import {ADD_TO_CARD, DELETE_FROM_CARD} from '../actions/actionTypes';

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

export interface ICardState {
  productsInCard: IProduct[];
}

const initialState: ICardState = {
  productsInCard: [],
};

export const cardReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_TO_CARD:
      return {...state, productsInCard: [...state.productsInCard, action.item]};
    case DELETE_FROM_CARD:
      const productsInCard = [...state.productsInCard].filter(
        (x) => x.ID !== action.id,
      );
      return {...state, productsInCard};
    default:
      return state;
  }
};
