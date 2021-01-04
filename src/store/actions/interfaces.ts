import {E164Number} from 'libphonenumber-js';

export interface ISendPhoneNumberResponse {
  result: boolean;
  message: string;
  data: {
    black_list: boolean;
    new: boolean;
  };
}

export interface ISendCodeResponse {
  result: boolean;
  message: string;
  data: {
    user_id: string;
  };
}

export type ISendPhoneNumber = (
  phone: E164Number,
) => Promise<ISendPhoneNumberResponse>;

export type ISendCode = (
  phone: E164Number,
  code: string,
) => Promise<ISendCodeResponse>;
