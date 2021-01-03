import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Block} from '@components';
import {Colors} from '@config';

export const Loader = () => (
  <Block
    flex={1}
    backgroundColor={Colors.background}
    justifyContent="center"
    alignItems="center">
    <ActivityIndicator size="large" color={'white'} />
  </Block>
);
