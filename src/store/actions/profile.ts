import axios from 'axios';
import {IGetUserResponse} from './interfaces';
import {GET_USER_SUCCESS, GET_APP_DATA_SUCCESS} from './actionTypes';
import {IProfileState} from 'src/store/reducers/profile';
import {logOut} from './auth';

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
          if (response.data.data?.black_list) {
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

export const updateUserDate = (token: string) => {
  return async (dispatch: any, getState: any) => {
    const store = getState();
    const params = {
      TYPE: 'update_user_date',
      USER_ID: store.profile.user_id,
      PUSH_TOKEN: token,
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

export const getAppData = () => {
  const params = {
    TYPE: 'get_app_data',
  };
  return (dispatch: any) => {
    return axios
      .post('', params)
      .then((response) => {
        if (response && response.data) {
          dispatch(getAppDataSuccess(response.data.data?.documents));
          return response.data;
        }
      })
      .catch((error) => console.log(error));
  };
};

const getAppDataSuccess = (documents: {name: string; text: string}[]) => {
  return {type: GET_APP_DATA_SUCCESS, documents};
};
