import React, {useCallback} from 'react';
import {Row, Block, Typography} from '@components';
import {ICatalogItem} from 'src/store/reducers/catalog';
import {Colors} from '@config';
import styled from 'styled-components';
import {Image, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getImage} from '@utils';

type Props = {
  item: ICatalogItem[];
};

export const SmallCatalogItem: React.FC<Props> = ({item}) => {
  const navigation = useNavigation();
  const pressHandler = useCallback(() => {
    return null;
  }, [item, navigation]);
  const renderItem = useCallback(
    (card: ICatalogItem) => {
      const countNew =
        card.CNT_NEW && parseInt(card.CNT_NEW, 10)
          ? parseInt(card.CNT_NEW, 10)
          : 0;

      return (
        <Wrapper
          backgroundColor={Colors.white}
          elevation={4}
          borderRadius={10}
          overflow={true}>
          <StyledPressable onPress={pressHandler}>
            <StyledImage resizeMode="contain" source={getImage(card.PICTURE)} />
            <Typography.B14 textAlign="center" color={Colors.black}>
              {card.NAME}
            </Typography.B14>
          </StyledPressable>
          {countNew > 0 && (
            <CntNew
              justifyContent="center"
              alignItems="center"
              borderRadius={18}
              backgroundColor={Colors.mainPrimary}>
              <Typography.B16 color={Colors.white}>
                {card.CNT_NEW}
              </Typography.B16>
            </CntNew>
          )}
        </Wrapper>
      );
    },
    [pressHandler],
  );

  return (
    <Row margin={5} justifyContent="space-between">
      {item.map(renderItem)}
    </Row>
  );
};

const StyledPressable = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.ripple,
  },
}))`
  height: 180px;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
`;

const StyledImage = styled(Image)`
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
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
