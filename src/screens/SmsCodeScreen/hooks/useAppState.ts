import {useEffect, useState} from 'react';
import {AppState} from 'react-native';

export const useAppState = () => {
  const [appState, setAppState] = useState(AppState.currentState);
  useEffect(() => {
    AppState.addEventListener('change', setAppState);
    return () => AppState.removeEventListener('change', setAppState);
  }, []);
  return appState;
};
