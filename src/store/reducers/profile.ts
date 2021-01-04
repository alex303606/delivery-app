import {SIGN_IN_SUCCESS, SIGN_OUT} from '../actions/actionTypes';

export interface IProfileState {
  userIsLoggedIn: boolean;
  user_id: string;
}

const initialState: IProfileState = {
  userIsLoggedIn: false,
  user_id: '',
};

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return {...state, user_id: action.user_id, userIsLoggedIn: true};
    case SIGN_OUT:
      return initialState;
    default:
      return state;
  }
};
