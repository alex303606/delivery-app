import {useTranslation} from 'react-i18next';
import {Block, ListEmptyComponent} from '@components';
import {STATUSBAR_HEIGHT} from '@config';
import {EScreens} from '@interfaces';
import {
  useNavigation,
  useFocusEffect,
  StackActions,
} from '@react-navigation/native';
import React from 'react';

export const OrderCompleteScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      return () => navigation.dispatch(StackActions.popToTop());
    }, [navigation]),
  );

  return (
    <Block flex={1} paddingTop={STATUSBAR_HEIGHT + 40} padding={16}>
      <ListEmptyComponent
        bigTitle={t('orderCompleteTitle')}
        title={t('orderComplete')}
        buttonTitle={t('goToMenu')}
        onPress={() => navigation.navigate(EScreens.CATALOG_STACK)}
      />
    </Block>
  );
};
