import {DefaultTheme as StyledDefaultTheme} from 'styled-components';
import {DefaultTheme, DarkTheme} from '@react-navigation/native';
import {Colors} from '@config';

// https://styled-components.com/docs/advanced#theming

export const styledTheme: StyledDefaultTheme = {
  button: {
    primaryBackgroundColor: '#f194ff',
  },
};

export const styledThemeDark: StyledDefaultTheme = {
  button: {
    primaryBackgroundColor: '#000000',
  },
};

// https://reactnavigation.org/docs/themes/

export const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: Colors.grey,
    card: Colors.background,
    background: Colors.background,
    text: Colors.black,
  },
};

export const navigationThemeDark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: Colors.black,
    card: Colors.black,
    border: Colors.grey,
    text: Colors.white,
  },
};
