import {parsePhoneNumber, parsePhoneNumberFromString} from 'libphonenumber-js';
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

export const parsePhoneNumberFormatInternational = (phone: string) => {
  let parsedPhone = phone || '';
  if (parsedPhone) {
    const phoneNumber = parsePhoneNumber(phone);
    if (phoneNumber && phoneNumber.formatInternational()) {
      parsedPhone = phoneNumber.formatInternational();
    }
  }

  return parsedPhone;
};
