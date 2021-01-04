import {useEffect} from 'react';
import {useTimer} from './useTimer';
import clamp from 'lodash/clamp';
import {useAppState} from './useAppState';

export const useTimoutTimer = (
  startTimeInMillis: number,
  timeoutInSec: number,
) => {
  const time = Math.trunc(
    clamp(
      timeoutInSec - (Date.now() - startTimeInMillis) / 1000,
      0,
      timeoutInSec,
    ),
  );
  const {count, startTimer, stopTimer} = useTimer(time);
  const appState = useAppState();

  useEffect(() => {
    if (appState === 'active' && count !== 0) {
      startTimer();
    }
    return stopTimer;
    // should re-run only when appState will change
  }, [appState]);

  useEffect(() => {
    startTimer();
  }, [startTimeInMillis]);

  return count;
};
