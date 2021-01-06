import React from 'react';
import {Block, Typography} from '@components';
import {useAppearance} from '@hooks';
import {STATUSBAR_HEIGHT} from '@config';
import {useTranslation} from 'react-i18next';

export const CardScreen = () => {
  const {textColor} = useAppearance();
  const {t} = useTranslation();

  return (
    <Block flex={1} paddingTop={STATUSBAR_HEIGHT + 40} padding={16}>
      <Typography.B34 color={textColor}>{t('tabs.basket')}</Typography.B34>
    </Block>
  );
};
