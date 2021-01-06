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

export const getUser = () => {
  return (dispatch: any, getState: any) => {
    const store = getState();
    const params = {
      TYPE: 'get_user',
      IS_MANAGER: false,
      USER_ID: store.profile.user_id,
    };
    return axios
      .post('', params)
      .then((response) => {
        if (response && response.data) {
          if (response.data.data.black_list) {
            dispatch(logOut());
          }
          if (response.data.result) {
            dispatch(getUserSuccess(response.data.data));
          }
          return response.data;
        }
      })
      .catch((error) => console.log(error));
  };
};

const getUserSuccess = (data: IGetUserResponse) => {
  return {type: GET_USER_SUCCESS, data};
};

export const updateUserDate = () => {
  return (dispatch: any, getState: any) => {
    const store = getState();
    const params = {
      TYPE: 'update_user_date',
      USER_ID: store.profile.user_id,
    };
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

export const editUser = ({
  firstname,
  lastname,
  city,
  phone,
  push_new_arrival,
  push_sale,
  sms,
}: IProfileState) => {
  return (dispatch: any, getState: any) => {
    const store = getState();
    const params = {
      TYPE: 'edit_user',
      USER_ID: store.profile.user_id,
      FIRST_NAME: firstname,
      LAST_NAME: lastname,
      PHONE: phone,
      CITY: city,
      PUSH_NEW_ARRIVAL: push_new_arrival,
      PUSH_SALE: push_sale,
      SMS: sms,
      ACTIVE: true,
    };
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
