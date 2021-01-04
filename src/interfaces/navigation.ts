import {MutableRefObject, RefObject} from 'react';
import {NavigationContainerRef} from '@react-navigation/native';
import {EScreens} from '@interfaces';
import {E164Number} from 'libphonenumber-js';
import {StackScreenProps} from '@react-navigation/stack';

export interface INavigationService {
  navigationRef: RefObject<NavigationContainerRef>;
  isReadyRef: MutableRefObject<boolean>;
  navigate: (name: EScreens, params: {[key: string]: any}) => void;
}

export type HomeStackParamList = {
  [EScreens.HOME_SCREEN]: {sid: number};
};

export type AuthStackParamList = {
  [EScreens.LOGIN_SCREEN]: undefined;
  [EScreens.SMS_CODE_SCREEN]: {phone: E164Number; currentTimeInMillis: number};
};

export type AuthorizationScreenProps = StackScreenProps<
  AuthStackParamList,
  EScreens.SMS_CODE_SCREEN
>;

//TABS
export type RootTabParamList = {
  [EScreens.CATALOG_STACK]: undefined;
  [EScreens.FAVORITES_STACK]: undefined;
  [EScreens.PROFILE_STACK]: undefined;
  [EScreens.CART_STACK]: undefined;
};
