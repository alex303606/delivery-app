import {SIGN_IN_SUCCESS, SIGN_OUT} from '../actions/actionTypes';

const initialState = {
  userIsLoggedIn: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return {...state, userIsLoggedIn: true};
    case SIGN_OUT:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
