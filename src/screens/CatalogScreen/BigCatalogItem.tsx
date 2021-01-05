import React, {useCallback} from 'react';
import {Block, Typography} from '@components';
import {Colors} from '@config';
import {ICatalogItem} from 'src/store/reducers/catalog';
import styled from 'styled-components';
import {ImageBackground, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {EScreens} from '@interfaces';
import {getImage} from '@utils';

type Props = {
  item: ICatalogItem;
  index: number;
};

export const BigCatalogItem: React.FC<Props> = ({item, index}) => {
  const backgroundColor = index % 2 === 0 ? Colors.black : Colors.mainPrimary;
  const navigation = useNavigation();
  const pressHandler = useCallback(() => {
    navigation.navigate(EScreens.CATALOG_ITEM_SCREEN, {parentItem: item});
  }, [item, navigation]);

  return (
    <Block
      backgroundColor={Colors.white}
      margin={5}
      elevation={4}
      borderRadius={10}
      overflow={true}>
      <StyledImage resizeMode="cover" source={getImage(item.PICTURE)}>
        <StyledPressable onPress={pressHandler}>
          <Block
            backgroundColor={backgroundColor}
            marginBottom={20}
            paddingHorizontal={12}>
            <Typography.B24 color={Colors.white}>{item.NAME}</Typography.B24>
          </Block>
        </StyledPressable>
      </StyledImage>
    </Block>
  );
};

const StyledPressable = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.ripple,
  },
}))`
  height: 200px;
  align-items: flex-start;
  justify-content: flex-end;
`;

const StyledImage = styled(ImageBackground)`
  width: 100%;
  height: 300px;
`;
