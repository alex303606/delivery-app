import {useCallback, useEffect, useRef, useState} from 'react';

export const useTimer = (startValue: number) => {
  const [count, setCount] = useState(startValue);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const timerRef = useRef<number | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current === null) {
      setCount(startValue);
      timerRef.current = setInterval(() => {
        setCount((prevCount) => Math.max(0, prevCount - 1));
      }, 1000);
      setIsTimerRunning(true);
    }
  }, [startValue]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setIsTimerRunning(false);
    }
  }, []);

  useEffect(() => {
    if (count <= 0) {
      stopTimer();
    }
  }, [count, stopTimer]);

  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, [stopTimer]);

  return {count, stopTimer, startTimer, isTimerRunning};
};
