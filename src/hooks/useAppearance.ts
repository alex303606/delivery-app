import {Appearance} from 'react-native-appearance';
import {Colors} from '@config';

export const UseAppearance = () => {
  const theme = Appearance.getColorScheme();
  const themeIsLight = theme === 'light';

  const backgroundColor: string = themeIsLight
    ? Colors.background
    : Colors.black;
  const textColor: string = themeIsLight ? Colors.black : Colors.white;

  return {
    backgroundColor,
    textColor,
    themeIsLight,
  };
};
