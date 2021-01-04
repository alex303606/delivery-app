import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Block} from '@components';
import {Colors} from '@config';

type Props = {
  background?: string;
  color?: string;
};

export const Loader: React.FC<Props> = ({
  background = Colors.background,
  color = Colors.white,
}) => (
  <Block
    flex={1}
    backgroundColor={background}
    justifyContent="center"
    alignItems="center">
    <ActivityIndicator size="large" color={color} />
  </Block>
);
