import React from 'react';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import {IconProps} from 'react-native-vector-icons/Icon';
const config = require('./config.json');

export const IconNames = {
  favoritesInactive: 'favorites_inactive',
  favoritesActive: 'favorites_active',
  basketActive: 'basket_active',
  basketInactive: 'basket_inactive',
  catalogActive: 'catalog_active',
  catalogInactive: 'catalog_inactive',
  profileActive: 'profile_active',
  profileInactive: 'profile_inactive',
};

export const IconSet = createIconSetFromIcoMoon(config);

export const Icon: React.FC<IconProps> = ({size = 24, ...rest}) => {
  return <IconSet size={size} {...rest} style={{lineHeight: size}} />;
};
