import {E164Number} from 'libphonenumber-js';

export interface ISendPhoneNumberResponse {
  result: boolean;
  message: string;
  data: {
    black_list: boolean;
    new: boolean;
  };
}

export type ISendPhoneNumber = (
  phone: E164Number,
) => Promise<ISendPhoneNumberResponse>;
