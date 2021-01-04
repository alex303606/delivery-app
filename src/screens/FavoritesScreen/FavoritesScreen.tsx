import React from 'react';
import {Block, Typography} from '@components';
import {UseAppearance} from '@hooks';
import {STATUSBAR_HEIGHT} from '@config';

export const FavoritesScreen = () => {
  const {textColor} = UseAppearance();

  return (
    <Block flex={1} paddingTop={STATUSBAR_HEIGHT + 16} padding={16}>
      <Typography.B34 color={textColor}>Favorites</Typography.B34>
    </Block>
  );
};
