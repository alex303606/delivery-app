import React from 'react';
import {Block, Typography, Row} from '@components';
import {IOrderItem} from 'src/store/reducers/orders';
import {Colors} from '@config';
import styled from 'styled-components';
import {Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {EScreens} from '@interfaces';
import {useTranslation} from 'react-i18next';

type Props = {
  item: IOrderItem;
};

export const Order: React.FC<Props> = ({item}) => {
  const count = item.PRODUCTS.reduce((acc: number, x) => {
    acc += x.COUNT;
    return acc;
  }, 0);

  const navigation = useNavigation();
  const {t} = useTranslation();

  return (
    <Block
      elevation={4}
      borderRadius={8}
      overflow={true}
      marginBottom={8}
      backgroundColor={Colors.white}>
      <StyledPressable
        onPress={() =>
          navigation.navigate(EScreens.ORDER_SCREEN, {order: item})
        }>
        <Row justifyContent="space-between">
          <Typography.B16>{t('orderNum', {num: item.ID})}</Typography.B16>
          <Typography.R14 color={Colors.grey}>
            {item.DATE_CREATE}
          </Typography.R14>
        </Row>
        <Row alignItems="center">
          <Typography.R14 color={Colors.grey}>{t('quantity')}</Typography.R14>
          <Typography.B16>{count}</Typography.B16>
        </Row>
        <Row justifyContent="space-between">
          <Typography.R14 color={Colors.grey}>{item.CITY}</Typography.R14>
          <Typography.B14 color={'#2AA952'}>
            {t(`orderProcess.${item.STATUS}`)}
          </Typography.B14>
        </Row>
      </StyledPressable>
    </Block>
  );
};

const StyledPressable = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.ripple,
  },
}))`
  padding: 12px;
`;
