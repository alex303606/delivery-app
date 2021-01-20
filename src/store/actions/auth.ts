import axios from 'axios';
import {E164Number} from 'libphonenumber-js';
import {ISendPhoneNumber} from './interfaces';
import {SIGN_IN_SUCCESS, SIGN_OUT, SET_USER_IS_NEW} from './actionTypes';

export const sendPhone = (
  phone: E164Number,
  code: string,
): ISendPhoneNumber => {
  const params = {
    TYPE: 'login',
    PHONE: phone,
    CODE: code,
  };
  return (dispatch: any) => {
    return axios
      .post('', params)
      .then((response) => {
        if (response && response.data) {
          if (response.data.result) {
            dispatch(setIsNewUserOrNot(response.data.data?.new));
            dispatch(loginUserSuccess(response.data.data.user_id));
          }
          return response.data;
        }
      })
      .catch((error) => console.log(error));
  };
};

export const setUserIsNotNew = () => {
  return (dispatch: any) => {
    dispatch(setIsNewUserOrNot(false));
  };
};

const setIsNewUserOrNot = (newUser: boolean) => {
  return {type: SET_USER_IS_NEW, newUser};
};

const loginUserSuccess = (user_id: string) => {
  return {type: SIGN_IN_SUCCESS, user_id};
};

export const logOut = () => {
  return (dispatch: any) => {
    dispatch({type: SIGN_OUT});
  };
};
