import {parsePhoneNumberFromString} from 'libphonenumber-js';
import {ICountry} from 'src/screens/LoginScreen/interfaces';

export const phoneIsValid = (phone: string, country: ICountry) => {
  const phoneNumber = parsePhoneNumberFromString(
    `${country.dialCode} ${phone}`,
  );
  if (phoneNumber) {
    return phoneNumber.isValid();
  }
  return false;
};

export const parsePhoneToString = (phone: string, country: ICountry) => {
  const phoneNumber = parsePhoneNumberFromString(
    `${country.dialCode} ${phone}`,
  );
  if (phoneNumber) {
    return phoneNumber.number;
  }
  return undefined;
};
