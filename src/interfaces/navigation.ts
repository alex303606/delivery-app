import {MutableRefObject, RefObject} from 'react';
import {NavigationContainerRef} from '@react-navigation/native';
import {EScreens} from '@interfaces';

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
  [EScreens.SMS_CODE_SCREEN]: undefined;
};

//TABS
export type RootTabParamList = {
  [EScreens.HOME_STACK]: undefined;
  [EScreens.MENU_STACK]: undefined;
  [EScreens.PROFILE_STACK]: undefined;
  [EScreens.SEARCH_STACK]: undefined;
  [EScreens.CART_STACK]: undefined;
};
