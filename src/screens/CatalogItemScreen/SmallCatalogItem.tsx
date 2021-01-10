import React, {useCallback} from 'react';
import {Row, Block, Typography} from '@components';
import {ICatalogItem} from 'src/store/reducers/catalog';
import {Colors} from '@config';
import styled from 'styled-components';
import {Image, ImageBackground, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getImage} from '@utils';
import {EScreens} from '@interfaces';

type Props = {
  item: ICatalogItem[];
};

export const SmallCatalogItem: React.FC<Props> = ({item}) => {
  const navigation = useNavigation();
  const pressHandler = useCallback(
    (card) => {
      return navigation.navigate(EScreens.PRODUCTS_SCREEN, {item: card});
    },
    [navigation],
  );

  const renderItem = useCallback(
    (card: ICatalogItem) => {
      const {PICTURE, NAME, CNT_NEW, BIG_PICTURE, ID} = card;

      const countNew =
        CNT_NEW && parseInt(CNT_NEW, 10) ? parseInt(CNT_NEW, 10) : 0;

      return (
        <Wrapper
          key={ID}
          backgroundColor={Colors.white}
          elevation={4}
          borderRadius={10}
          overflow={true}>
          {BIG_PICTURE ? (
            <StyledImageBackground
              resizeMode="cover"
              source={getImage(PICTURE)}>
              <StyledPressable big={true} onPress={() => pressHandler(card)}>
                <TextContainer>
                  <Typography.B14 color={Colors.black}>{NAME}</Typography.B14>
                </TextContainer>
              </StyledPressable>
            </StyledImageBackground>
          ) : (
            <StyledPressable onPress={() => pressHandler(card)}>
              <StyledImage resizeMode="cover" source={getImage(PICTURE)} />
              <Typography.B14 color={Colors.black}>{NAME}</Typography.B14>
            </StyledPressable>
          )}
          {countNew > 0 && (
            <CntNew
              justifyContent="center"
              alignItems="center"
              borderRadius={18}
              backgroundColor={Colors.mainPrimary}>
              <Typography.B16 color={Colors.white}>{CNT_NEW}</Typography.B16>
            </CntNew>
          )}
        </Wrapper>
      );
    },
    [pressHandler],
  );

  return (
    <Row marginBottom={8} justifyContent="space-between">
      {item.map(renderItem)}
    </Row>
  );
};

const StyledPressable = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.ripple,
  },
}))<{big?: boolean}>`
  height: 180px;
  align-items: center;
  justify-content: ${({big}) => (big ? 'flex-end' : 'space-between;')}
  padding: ${({big}) => (big ? 0 : 15)}px;
`;

const StyledImage = styled(Image)`
  width: 100px;
  height: 100px;
`;

const CntNew = styled(Block)`
  width: 36px;
  height: 36px;
  position: absolute;
  top: 5px;
  right: 5px;
`;

const Wrapper = styled(Block)`
  width: 48.6%;
`;

const TextContainer = styled(Block)`
  background-color: rgba(255, 255, 255, 0.5);
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 38px;
`;

const StyledImageBackground = styled(ImageBackground)`
  width: 100%;
  height: 180px;
`;
