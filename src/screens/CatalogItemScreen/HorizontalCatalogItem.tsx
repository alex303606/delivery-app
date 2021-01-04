import React, {useCallback} from 'react';
import {Block, Typography} from '@components';
import {Colors} from '@config';
import {ICatalogItem} from 'src/store/reducers/catalog';
import styled from 'styled-components';
import {Image, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {EScreens} from '@interfaces';
import {getImage} from '@utils';

type Props = {
  item: ICatalogItem;
};

export const HorizontalCatalogItem: React.FC<Props> = ({item}) => {
  const navigation = useNavigation();
  const pressHandler = useCallback(() => {
    return null;
  }, [item, navigation]);

  return (
    <Block
      backgroundColor={Colors.white}
      margin={5}
      elevation={4}
      borderRadius={10}
      overflow={true}>
      <StyledPressable onPress={pressHandler}>
        <StyledImage resizeMode="contain" source={getImage(item.PICTURE)} />
        <Title color={Colors.black}>{item.NAME}</Title>
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
  height: 180px;
  padding: 20px;
`;

const StyledImage = styled(Image)`
  flex: 1;
  align-items: flex-end;
  justify-content: flex-end;
`;

const Title = styled(Typography.B14)`
  position: absolute;
  right: 10px;
  bottom: 12px;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 3px 10px;
`;
