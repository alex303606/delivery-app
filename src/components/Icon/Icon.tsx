import React from 'react';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import {IconProps} from 'react-native-vector-icons/Icon';
const config = require('./config.json');

export const IconNames = {
  steak: 'steak',
  pencil: 'pencil',
  card: 'card',
  price: 'price',
  sauces: 'sauces',
  sideDishes: 'side-dishes',
  bakery: 'bakery',
  menu: 'menu',
  home: 'home',
  childrenMenu: 'children_menu',
  checkoutReady: 'checkout-ready',
  paymentMethod: 'payment-method',
  banquetMenu: 'banquet-menu',
  drinks: 'drinks',
  second: 'second',
  soups: 'soups',
  snack: 'snack',
  search: 'search',
  basket: 'basket',
  iconSupport: 'ico_support',
  office: 'office',
  empty: 'empty',
  dessert: 'dessert',
  barbecue: 'barbecue',
  pilaf: 'pilaf',
  hansamsi: 'hansamsi',
  breakfast: 'breakfast',
  profile: 'profile',
};

export const IconSet = createIconSetFromIcoMoon(config);

export const Icon: React.FC<IconProps> = ({size = 24, ...rest}) => {
  return <IconSet size={size} {...rest} style={{lineHeight: size}} />;
};
