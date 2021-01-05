import React, {useCallback} from 'react';
import {Block, Typography} from '@components';
import {Colors} from '@config';
import {ICatalogItem} from 'src/store/reducers/catalog';
import styled from 'styled-components';
import {Image, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getImage} from '@utils';

type Props = {
  item: ICatalogItem;
};

export const HorizontalCatalogItem: React.FC<Props> = ({item}) => {
  const navigation = useNavigation();

  const pressHandler = useCallback(() => {
    return null;
  }, [item, navigation]);

  const countNew =
    item.CNT_NEW && parseInt(item.CNT_NEW, 10) ? parseInt(item.CNT_NEW, 10) : 0;

  return (
    <Block
      backgroundColor={Colors.white}
      margin={5}
      elevation={4}
      borderRadius={10}
      overflow={true}>
      <StyledPressable onPress={pressHandler}>
        <StyledImage resizeMode="contain" source={getImage(item.PICTURE)} />
        <Block flex={1} alignItems="flex-end" justifyContent="flex-end">
          <Typography.B14 color={Colors.black}>{item.NAME}</Typography.B14>
        </Block>
      </StyledPressable>
      {countNew > 0 && (
        <CntNew
          justifyContent="center"
          alignItems="center"
          borderRadius={18}
          backgroundColor={Colors.mainPrimary}>
          <Typography.B16 color={Colors.white}>{item.CNT_NEW}</Typography.B16>
        </CntNew>
      )}
    </Block>
  );
};

const StyledPressable = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.ripple,
  },
}))`
  height: 180px;
  padding: 20px;
  flex-direction: row;
`;

const StyledImage = styled(Image)`
  flex: 1;
`;

const CntNew = styled(Block)`
  width: 36px;
  height: 36px;
  position: absolute;
  top: 5px;
  right: 5px;
`;
