import {MutableRefObject, RefObject} from 'react';
import {NavigationContainerRef} from '@react-navigation/native';
import {EScreens} from '@interfaces';
import {E164Number} from 'libphonenumber-js';
import {StackScreenProps} from '@react-navigation/stack';
import {ICatalogItem} from 'src/store/reducers/catalog';
import {IProduct} from 'src/store/reducers/favoritest';

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
  [EScreens.PRODUCTS_SCREEN]: {item: ICatalogItem};
};

export type CardStackParamList = {
  [EScreens.CARD_SCREEN]: undefined;
  [EScreens.NEW_ORDER_SCREEN]: undefined;
  [EScreens.ORDER_COMPLETE_SCREEN]: undefined;
};

export type ProfileStackParamList = {
  [EScreens.PROFILE_SCREEN]: undefined;
  [EScreens.ORDERS_SCREEN]: undefined;
  [EScreens.SETTINGS_SCREEN]: undefined;
  [EScreens.PERSONAL_DATA_SCREEN]: {newUser: boolean};
  [EScreens.APP_DATA_SCREEN]: {index: number};
};

export type FavoritesStackParamList = {
  [EScreens.FAVORITES_SCREEN]: undefined;
  [EScreens.FAVORITE_SCREEN]: {item: IProduct};
};

export type AuthorizationScreenProps = StackScreenProps<
  AuthStackParamList,
  EScreens.SMS_CODE_SCREEN
>;

export type CatalogScreenProps = StackScreenProps<
  CatalogStackParamList,
  EScreens.CATALOG_ITEM_SCREEN
>;

export type ProductsScreenProps = StackScreenProps<
  CatalogStackParamList,
  EScreens.PRODUCTS_SCREEN
>;

export type FavoriteScreenProps = StackScreenProps<
  FavoritesStackParamList,
  EScreens.FAVORITE_SCREEN
>;

export type PersonalDataScreenProps = StackScreenProps<
  ProfileStackParamList,
  EScreens.PERSONAL_DATA_SCREEN
>;

export type AppDataScreenProps = StackScreenProps<
  ProfileStackParamList,
  EScreens.APP_DATA_SCREEN
>;

//TABS
export type RootTabParamList = {
  [EScreens.CATALOG_STACK]: undefined;
  [EScreens.FAVORITES_STACK]: undefined;
  [EScreens.PROFILE_STACK]: undefined;
  [EScreens.CART_STACK]: undefined;
};

export type RootStackParamList = {
  [EScreens.ROOT_TABS]: undefined;
  [EScreens.FIRST_DATA_SCREEN]: {newUser: boolean};
};
