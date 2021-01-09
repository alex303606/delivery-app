import axios from 'axios';
import {E164Number} from 'libphonenumber-js';
import {ISendCode, ISendPhoneNumber, IGetUserResponse} from './interfaces';
import {
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  GET_USER_SUCCESS,
  SET_USER_IS_NEW,
} from './actionTypes';
import {IProfileState} from 'src/store/reducers/profile';

export const sendPhone = (phone: E164Number): ISendPhoneNumber => {
  const params = {
    TYPE: 'login',
    PHONE: phone,
  };
  return (dispatch: any) => {
    return axios
      .post('', params)
      .then((response) => {
        if (response && response.data) {
          dispatch(setIsNewUserOrNot(response.data.data?.new));
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
