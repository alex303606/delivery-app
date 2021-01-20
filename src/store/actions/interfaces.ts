import {E164Number} from 'libphonenumber-js';
import {ICatalogItem} from 'src/store/reducers/catalog';

export interface ISendPhoneNumberResponse {
  result: boolean;
  message: string;
  data: {
    black_list: boolean;
    new: boolean;
  };
}

export interface IGetUserResponse {
  result: boolean;
  message: string;
  data: {
    black_list: boolean;
    city: string | null;
    firstname: string | null;
    id: string;
    lastname: string | null;
    phone: string;
    push_new_arrival: boolean;
    push_sale: boolean;
    sms: boolean;
  };
}

export type ISendPhoneNumber = (
  phone: E164Number,
  code: string,
) => Promise<ISendPhoneNumberResponse>;

export type IGetUser = () => Promise<IGetUserResponse>;

export type IEditUser = (data: {
  firstname: string;
  lastname: string;
  city: string;
  phone: string;
  push_new_arrival: boolean;
  push_sale: boolean;
  sms: boolean;
}) => Promise<{result: boolean; message: string}>;

interface IGetCatalogResponse {
  result: boolean;
  message: string;
  data: ICatalogItem[];
}

export type IGetCatalog = () => Promise<IGetCatalogResponse>;
