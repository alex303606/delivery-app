import React from 'react';
import {Typography, Block, Row, RoundButton} from '@components';
import {IProduct} from 'src/store/reducers/favoritest';
import styled from 'styled-components';
import {View, Pressable, ImageBackground} from 'react-native';
import {Colors} from '@config';
import {getImage} from '@utils';

type Props = {
  item: IProduct;
  onPress: (item: IProduct) => void;
  onDelete: (id: string) => void;
};

export const ProductCard: React.FC<Props> = ({item, onPress, onDelete}) => {
  return (
    <ProductsCardContainer>
      <Block marginBottom={3} borderRadius={8} overflow={true}>
        <StyledImage resizeMode="cover" source={getImage(item.PICTURES[0])}>
          <StyledPressable onPress={() => onPress(item)}>
            <Row flex={1} padding={10} justifyContent="space-between">
              <Block alignItems="flex-start">
                {item.IS_NEW && (
                  <Bubble backgroundColor={Colors.mainPrimary}>
                    <Typography.B11 color={Colors.white}>
                      Новинка
                    </Typography.B11>
                  </Bubble>
                )}
                {item.IS_SALE && (
                  <Bubble backgroundColor="#F2994A">
                    <Typography.B11 color={Colors.white}>
                      Супер цена
                    </Typography.B11>
                  </Bubble>
                )}
              </Block>
              <RoundButton
                backgroundColor={Colors.white}
                onPress={() => onDelete(item.ID)}
                iconName="close-outline"
                diameter={30}
              />
            </Row>
            {!!item.PRICE && (
              <Row justifyContent="flex-start" marginBottom={40}>
                <Row
                  padding={5}
                  alignItems="center"
                  backgroundColor={Colors.white}>
                  <Typography.B14>{item.PRICE}</Typography.B14>
                </Row>
              </Row>
            )}
          </StyledPressable>
        </StyledImage>
      </Block>
      <Typography.R12 color={Colors.grey} numberOfLines={1}>
        {item.NAME}
      </Typography.R12>
    </ProductsCardContainer>
  );
};

const ProductsCardContainer = styled(View)`
  flex: 1;
  max-width: 49%;
  margin: 0 0 8px 0;
  background-color: ${Colors.transparent};
`;

const Bubble = styled(Block)`
  height: 20px;
  margin: 3px 0;
  padding: 0 5px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

const StyledPressable = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.ripple,
  },
}))<{disabled?: boolean}>`
  height: 247px;
  opacity: ${({disabled}) => (disabled ? 0.7 : 1)};
`;

const StyledImage = styled(ImageBackground)`
  width: 100%;
  height: 236px;
`;
