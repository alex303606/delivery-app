import React from 'react';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import {IconProps} from 'react-native-vector-icons/Icon';
const config = require('./config.json');

export const IconNames = {
  favoritesInactive: 'favorit-inactive',
  favoritesActive: 'favorit-active',
  searchActive: 'search-active',
  searchInactive: 'search-inactive',
  addActive: 'add-active',
  addInactive: 'add-inactive',
  chatActive: 'chat-active',
  chatInactive: 'chat-inactive',
  profileActive: 'user-active',
  profileInactive: 'user-inactive',
};

export const IconSet = createIconSetFromIcoMoon(config);

export const Icon: React.FC<IconProps> = ({size = 24, ...rest}) => {
  return <IconSet size={size} {...rest} style={{lineHeight: size}} />;
};
