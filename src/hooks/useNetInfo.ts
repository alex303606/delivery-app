import {useEffect, useState} from 'react';
import {useDependencies} from './useDependencies';
import {INetInfoState} from '@utils';

export const useNetInfo = () => {
  const deps = useDependencies();
  const NetInfo = deps.get('netInfo');
  const [netInfo, setNetInfo] = useState({} as INetInfoState);

  useEffect(() => {
    return NetInfo.addEventListener(setNetInfo);
  }, [NetInfo]);
  return netInfo;
};
