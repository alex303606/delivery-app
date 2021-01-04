import {GET_SECTIONS} from '../actions/actionTypes';

export interface ICatalogItem {
  BIG_PICTURE: boolean;
  CNT_NEW: string;
  DEPTH_LEVEL: string;
  ID: string;
  NAME: string;
  PARENT_ID: string;
  PICTURE: string;
}

export interface IProfileState {
  catalog: ICatalogItem[];
}

const initialState: IProfileState = {
  catalog: [],
};

export const catalogReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_SECTIONS:
      return {...state, catalog: action.catalog};
    default:
      return state;
  }
};
