import React from 'react';
import {Colors} from '@config';
import {getImage} from '@utils';
import {Block, RoundButton, Row, Typography} from '@components';
import {IProduct} from 'src/store/reducers/card';
import styled from 'styled-components';
import {Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import {RoundButtons} from './RoundButtons';

type Props = {
  item: IProduct;
  onDelete: (id: string) => void;
  increment: (item: IProduct) => void;
  decrement: (item: IProduct) => void;
};

export const ProductCard: React.FC<Props> = ({
  item,
  onDelete,
  increment,
  decrement,
}) => {
  const {t} = useTranslation();

  return (
    <Row
      elevation={4}
      marginBottom={8}
      borderRadius={8}
      overflow={true}
      backgroundColor={Colors.white}>
      <ProductImage resizeMode="cover" source={getImage(item.PICTURES[0])} />
      <Block flex={1} padding={10}>
        <Row flex={1}>
          <Block flex={1} paddingRight={10}>
            <Typography.B14 marginBottom={4} numberOfLines={1}>
              {item.NAME}
            </Typography.B14>
            <Typography.R12
              marginBottom={4}
              color={Colors.grey}
              numberOfLines={2}>
              {item.TEXT || ''}
            </Typography.R12>
          </Block>
          <RoundButton
            elevation={4}
            backgroundColor={Colors.white}
            onPress={() => onDelete(item.ID)}
            iconName="close-outline"
            diameter={30}
          />
        </Row>
        <Row>
          <Block>
            {item.IS_NEW && (
              <Row>
                <Bubble backgroundColor={Colors.mainPrimary}>
                  <Typography.B11 color={Colors.white}>
                    {t('new')}
                  </Typography.B11>
                </Bubble>
              </Row>
            )}
            {item.IS_SALE && (
              <Row>
                <Bubble backgroundColor="#F2994A">
                  <Typography.B11 color={Colors.white}>
                    {t('sale')}
                  </Typography.B11>
                </Bubble>
              </Row>
            )}
          </Block>
          <Row paddingLeft={10} flex={1}>
            <RoundButtons
              count={item.count}
              onMinusPressHandler={() => decrement(item)}
              onPlusPressHandler={() => increment(item)}
              isAddedState={item.count > 0}
            />
          </Row>
        </Row>
      </Block>
    </Row>
  );
};

const ProductImage = styled(Image)`
  width: 120px;
  height: 130px;
`;

const Bubble = styled(Block)`
  height: 20px;
  margin: 3px 0;
  padding: 0 5px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;
