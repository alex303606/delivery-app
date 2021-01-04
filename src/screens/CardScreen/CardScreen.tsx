import React from 'react';
import {Block, Typography} from '@components';
import {UseAppearance} from '@hooks';

export const CardScreen = () => {
  const {textColor} = UseAppearance();

  return (
    <Block flex={1} padding={16}>
      <Typography.B34 color={textColor}>Card</Typography.B34>
    </Block>
  );
};
