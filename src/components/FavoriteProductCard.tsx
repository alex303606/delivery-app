import React from 'react';
import {Typography, Block, Row, RoundButton, Button} from '@components';
import {IProduct} from 'src/store/reducers/favoritest';
import styled from 'styled-components';
import {View, Pressable, ImageBackground} from 'react-native';
import {Colors} from '@config';
import {getImage} from '@utils';
import {useTranslation} from 'react-i18next';

type Props = {
  item: IProduct;
  onPress?: (item: IProduct) => void;
  onDelete?: (id: string) => void;
  disabled?: boolean;
  addToCard: (item: IProduct) => void;
};

export const FavoriteProductCard: React.FC<Props> = ({
  item,
  onPress,
  onDelete,
  disabled,
  addToCard,
}) => {
  const {t} = useTranslation();
  return (
    <ProductsCardContainer>
      <Block marginBottom={3} borderRadius={8} overflow={true}>
        <StyledImage resizeMode="cover" source={getImage(item.PICTURES[0])}>
          <StyledPressable
            disabled={disabled}
            onPress={() => (onPress ? onPress(item) : null)}>
            <Row flex={1} padding={10} justifyContent="space-between">
              <Block alignItems="flex-start">
                {item.IS_NEW && (
                  <Bubble backgroundColor={Colors.mainPrimary}>
                    <Typography.B11 color={Colors.white}>
                      {t('new')}
                    </Typography.B11>
                  </Bubble>
                )}
                {item.IS_SALE && (
                  <Bubble backgroundColor="#F2994A">
                    <Typography.B11 color={Colors.white}>
                      {t('sale')}
                    </Typography.B11>
                  </Bubble>
                )}
              </Block>
              {onDelete && (
                <RoundButton
                  backgroundColor={Colors.white}
                  onPress={() => (onDelete ? onDelete(item.ID) : null)}
                  iconName="close-outline"
                  diameter={30}
                />
              )}
            </Row>
            {!!item.PRICE && (
              <Row justifyContent="flex-start" marginBottom={20}>
                <Row
                  padding={5}
                  alignItems="center"
                  backgroundColor={Colors.white}>
                  <Typography.B14>{item.PRICE}</Typography.B14>
                </Row>
              </Row>
            )}
            {!disabled && (
              <Button
                color={'#DADADA'}
                textColor={Colors.black}
                margin={8}
                title={t('addToCard')}
                onPress={() => addToCard(item)}
              />
            )}
          </StyledPressable>
        </StyledImage>
      </Block>
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
  flex: 1;
  opacity: ${({disabled}) => (disabled ? 0.7 : 1)};
`;

const StyledImage = styled(ImageBackground)`
  width: 100%;
  height: 250px;
`;
