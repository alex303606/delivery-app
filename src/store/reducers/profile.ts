import {
  GET_USER_SUCCESS,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
} from '../actions/actionTypes';

export interface IProfileState {
  userIsLoggedIn: boolean;
  user_id: string;
  black_list: boolean;
  city: string | null;
  firstname: string | null;
  id: string;
  lastname: string | null;
  phone: string;
  push_new_arrival: boolean;
  push_sale: boolean;
  sms: boolean;
}

const initialState: IProfileState = {
  userIsLoggedIn: false,
  user_id: '',
  black_list: false,
  city: null,
  firstname: null,
  id: '',
  lastname: null,
  phone: '',
  push_new_arrival: true,
  push_sale: true,
  sms: true,
};

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return {...state, user_id: action.user_id, userIsLoggedIn: true};
    case GET_USER_SUCCESS:
      return {...state, ...action.data};
    case SIGN_OUT:
      return initialState;
    default:
      return state;
  }
};
