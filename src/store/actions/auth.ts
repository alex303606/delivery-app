import axios from 'axios';
import {E164Number} from 'libphonenumber-js';
import {ISendCode, ISendPhoneNumber} from './interfaces';
import {SIGN_IN_SUCCESS, SIGN_OUT} from './actionTypes';

export const sendPhone = (phone: E164Number): ISendPhoneNumber => {
  const params = {
    TYPE: 'login',
    PHONE: phone,
  };
  return () => {
    return axios
      .post('', params)
      .then((response) => {
        if (response && response.data) {
          return response.data;
        }
      })
      .catch((error) => console.log(error));
  };
};

export const confirmationCode = (
  phone: E164Number,
  code: string,
): ISendCode => {
  const params = {
    TYPE: 'confirmation_code',
    PHONE: phone,
    CODE: code,
  };
  return (dispatch: any) => {
    return axios
      .post('', params)
      .then((response) => {
        if (response && response.data) {
          if (response.data.result) {
            dispatch(loginUserSuccess(response.data.data.user_id));
          }
          return response.data;
        }
      })
      .catch((error) => console.log(error));
  };
};

const loginUserSuccess = (user_id: string) => {
  return {type: SIGN_IN_SUCCESS, user_id};
};

export const logOut = () => {
  return (dispatch: any) => {
    dispatch({type: SIGN_OUT});
  };
};
