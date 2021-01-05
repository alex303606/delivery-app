import {MutableRefObject, RefObject} from 'react';
import {NavigationContainerRef} from '@react-navigation/native';
import {EScreens} from '@interfaces';
import {E164Number} from 'libphonenumber-js';
import {StackScreenProps} from '@react-navigation/stack';
import {ICatalogItem} from 'src/store/reducers/catalog';

export interface INavigationService {
  navigationRef: RefObject<NavigationContainerRef>;
  isReadyRef: MutableRefObject<boolean>;
  navigate: (name: EScreens, params: {[key: string]: any}) => void;
}

export type AuthStackParamList = {
  [EScreens.LOGIN_SCREEN]: undefined;
  [EScreens.SMS_CODE_SCREEN]: {phone: E164Number; currentTimeInMillis: number};
};

export type CatalogStackParamList = {
  [EScreens.CATALOG_SCREEN]: undefined;
  [EScreens.CATALOG_ITEM_SCREEN]: {parentItem: ICatalogItem};
};

export type CardStackParamList = {
  [EScreens.CARD_SCREEN]: undefined;
};

export type ProfileStackParamList = {
  [EScreens.PROFILE_SCREEN]: undefined;
  [EScreens.ORDERS_SCREEN]: undefined;
  [EScreens.SETTINGS_SCREEN]: undefined;
  [EScreens.PERSONAL_DATA_SCREEN]: undefined;
};

export type FavoritesStackParamList = {
  [EScreens.FAVORITES_SCREEN]: undefined;
};

export type AuthorizationScreenProps = StackScreenProps<
  AuthStackParamList,
  EScreens.SMS_CODE_SCREEN
>;

export type CatalogScreenProps = StackScreenProps<
  CatalogStackParamList,
  EScreens.CATALOG_ITEM_SCREEN
>;

//TABS
export type RootTabParamList = {
  [EScreens.CATALOG_STACK]: undefined;
  [EScreens.FAVORITES_STACK]: undefined;
  [EScreens.PROFILE_STACK]: undefined;
  [EScreens.CART_STACK]: undefined;
};
