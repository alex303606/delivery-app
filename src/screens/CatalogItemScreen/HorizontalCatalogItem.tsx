import React, {useCallback} from 'react';
import {Block, Typography} from '@components';
import {Colors} from '@config';
import {ICatalogItem} from 'src/store/reducers/catalog';
import styled from 'styled-components';
import {Image, ImageBackground, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getImage} from '@utils';
import {EScreens} from '@interfaces';

type Props = {
  item: ICatalogItem;
};

export const HorizontalCatalogItem: React.FC<Props> = ({item}) => {
  const navigation = useNavigation();

  const pressHandler = useCallback(() => {
    return navigation.navigate(EScreens.PRODUCTS_SCREEN, {item});
  }, [item, navigation]);

  const countNew =
    item.CNT_NEW && parseInt(item.CNT_NEW, 10) ? parseInt(item.CNT_NEW, 10) : 0;

  return (
    <Block
      marginBottom={8}
      backgroundColor={Colors.white}
      elevation={4}
      borderRadius={10}
      overflow={true}>
      {item.BIG_PICTURE ? (
        <StyledImageBackground
          resizeMode="cover"
          source={getImage(item.PICTURE)}>
          <StyledPressableBig onPress={pressHandler}>
            <TextContainer>
              <Typography.B14 color={Colors.black}>{item.NAME}</Typography.B14>
            </TextContainer>
          </StyledPressableBig>
        </StyledImageBackground>
      ) : (
        <StyledPressable onPress={pressHandler}>
          <StyledImage resizeMode="contain" source={getImage(item.PICTURE)} />
          <Block flex={1} alignItems="flex-end" justifyContent="flex-end">
            <Typography.B14 color={Colors.black}>{item.NAME}</Typography.B14>
          </Block>
        </StyledPressable>
      )}
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

const StyledPressableBig = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.ripple,
  },
}))<{big?: boolean}>`
  height: 180px;
  align-items: flex-start;
  justify-content: flex-end;
  padding-bottom: 20px;
`;

const StyledImage = styled(Image)`
  flex: 1;
`;

const StyledImageBackground = styled(ImageBackground)`
  width: 100%;
  height: 180px;
`;

const CntNew = styled(Block)`
  width: 36px;
  height: 36px;
  position: absolute;
  top: 5px;
  right: 5px;
`;

const TextContainer = styled(Block)`
  background-color: rgba(255, 255, 255, 0.5);
  align-items: center;
  justify-content: center;
  height: 30px;
  padding: 0 20px;
`;
