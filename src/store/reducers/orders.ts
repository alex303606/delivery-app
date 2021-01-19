import {GET_ORDERS, SIGN_OUT} from '../actions/actionTypes';

export enum IStatus {
  N = 'N',
  S = 'S',
  Y = 'Y',
  C = 'C',
}

export interface IOrderItem {
  CITY: string;
  COMMENT: string;
  DATE_CREATE: string;
  ID: string;
  MANAGER_ID: string;
  MANAGER_LAST_NAME: string;
  MANAGER_NAME: string;
  PRODUCTS: [
    {
      COUNT: number;
      ID: number;
    },
  ];
  STATUS: IStatus;
  USER_ID: string;
  USER_LAST_NAME: string;
  USER_NAME: string;
  USER_PHONE: string;
}

export interface IOrdersState {
  orders: IOrderItem[];
}

const initialState: IOrdersState = {
  orders: [],
};

export const ordersReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_ORDERS:
      return {...state, orders: action.orders};
    case SIGN_OUT:
      return initialState;
    default:
      return state;
  }
};
