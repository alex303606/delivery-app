import {GET_SECTIONS, SIGN_OUT} from '../actions/actionTypes';

export interface ICatalogItem {
  BIG_PICTURE: boolean;
  CNT_NEW: string;
  DEPTH_LEVEL: string;
  ID: string;
  NAME: string;
  PARENT_ID: string;
  PICTURE: string;
}

export interface ICatalogState {
  catalog: ICatalogItem[];
}

const initialState: ICatalogState = {
  catalog: [],
};

export const catalogReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_SECTIONS:
      return {...state, catalog: action.catalog};
    case SIGN_OUT:
      return initialState;
    default:
      return state;
  }
};
