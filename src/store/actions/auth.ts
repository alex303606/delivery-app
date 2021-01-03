import axios from 'axios';
import {E164Number} from 'libphonenumber-js';
import {ISendPhoneNumber} from './interfaces';

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
