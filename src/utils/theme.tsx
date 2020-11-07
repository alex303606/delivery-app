import {DefaultTheme as StyledDefaultTheme} from 'styled-components';
import {DefaultTheme, DarkTheme} from '@react-navigation/native';

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
  },
};

export const navigationThemeDark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
  },
};
