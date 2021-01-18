import {
  ADD_TO_CARD,
  CLEAR_CARD,
  DECREMENT_FROM_CARD,
  DELETE_FROM_CARD,
  SIGN_OUT,
} from '../actions/actionTypes';

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
  count: number;
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
      const {item} = action;
      const index = state.productsInCard.findIndex((x) => x.ID === item.ID);
      if (index >= 0) {
        const products = [...state.productsInCard];
        products[index] = {
          ...products[index],
          count: products[index].count + 1,
        };
        return {...state, productsInCard: products};
      }
      item.count = 1;
      return {
        ...state,
        productsInCard: [...state.productsInCard, item],
      };
    case DELETE_FROM_CARD:
      const productsInCard = [...state.productsInCard].filter(
        (x) => x.ID !== action.id,
      );
      return {...state, productsInCard};
    case DECREMENT_FROM_CARD:
      const productIndex = state.productsInCard.findIndex(
        (x) => x.ID === action.item.ID,
      );
      const products = [...state.productsInCard];
      if (productIndex >= 0 && products[productIndex].count > 0) {
        products[productIndex] = {
          ...products[productIndex],
          count: products[productIndex].count - 1,
        };
        return {...state, productsInCard: products};
      }
      return {...state};
    case SIGN_OUT:
      return initialState;
    case CLEAR_CARD:
      return {...state, productsInCard: []};
    default:
      return state;
  }
};
