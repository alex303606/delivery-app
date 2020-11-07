import {Dimensions, StatusBar} from 'react-native';
import {initialWindowMetrics} from 'react-native-safe-area-context';

export const STATUSBAR_HEIGHT = StatusBar.currentHeight ?? 0;
export const DEVICE_HAS_NOTCH = STATUSBAR_HEIGHT > 24;
export const TOP_INSET = DEVICE_HAS_NOTCH ? 0 : STATUSBAR_HEIGHT;

const screenHeightFallback = DEVICE_HAS_NOTCH
  ? Dimensions.get('window').height
  : Dimensions.get('window').height - STATUSBAR_HEIGHT;

export const WINDOW_HEIGHT =
  initialWindowMetrics?.frame.height || screenHeightFallback;
