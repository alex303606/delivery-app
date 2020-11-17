import React from 'react';
import {useNetInfo} from '@hooks';
import {NoConnection} from '@components';
import {EShadow} from '@config';

export const ConnectionHandler = React.memo(() => {
  const {isInternetReachable} = useNetInfo();

  return (
    <NoConnection
      isVisible={isInternetReachable === false}
      elevation={EShadow.S}
    />
  );
});
