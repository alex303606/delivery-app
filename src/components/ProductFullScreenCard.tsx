import React, {useCallback} from 'react';
import {IProduct} from 'src/store/reducers/favoritest';
import {Image, ScrollView} from 'react-native';
import {Colors, WINDOW_WIDTH} from '@config';
import {getImage} from '@utils';
import {
  Block,
  Button,
  RoundButton,
  Row,
  Typography,
  Icon,
  IconNames,
} from '@components';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

type Props = {
  item: IProduct;
  layoutHeight?: number;
  addToFavorite?: (id: string) => void;
  deleteFavorite?: (id: string) => void;
  isLiked?: boolean;
  isAddedToCard?: boolean;
  addToCard: (item: IProduct) => void;
  count: number;
};

export const ProductFullScreenCard: React.FC<Props> = ({
  item,
  layoutHeight,
  addToFavorite,
  deleteFavorite,
  isLiked,
  addToCard,
  isAddedToCard,
  count = 0,
}) => {
  const {t} = useTranslation();
  const onPressHandler = useCallback(() => {
    if (!addToFavorite || !deleteFavorite) {
      return;
    }
    if (isLiked) {
      return deleteFavorite(item.ID);
    }
    return addToFavorite(item.ID);
  }, [addToFavorite, deleteFavorite, isLiked, item.ID]);

  return (
    <Wrapper height={layoutHeight}>
      <ScrollView
        horizontal={true}
        disableIntervalMomentum={true}
        decelerationRate="normal"
        snapToInterval={WINDOW_WIDTH}
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        {item.PICTURES.map((image: string, i: number) => (
          <StyledImage key={i} resizeMode="cover" source={getImage(image)} />
        ))}
      </ScrollView>
      {addToFavorite && deleteFavorite && (
        <StyledRoundButton paddingTop={50} paddingRight={20}>
          <RoundButton
            diameter={60}
            iconSize={40}
            iconName={isLiked ? 'heart' : 'heart'}
            iconColor={isLiked ? Colors.mainPrimary : Colors.grey}
            onPress={onPressHandler}
          />
        </StyledRoundButton>
      )}
      {isAddedToCard && count > 0 && (
        <CountWrapper marginTop={120} marginRight={20}>
          <Icon size={36} color={Colors.white} name={IconNames.basketActive} />
          <Count backgroundColor={Colors.mainPrimary}>
            <Typography.B11 numberOfLines={1} color={Colors.white}>
              {count}
            </Typography.B11>
          </Count>
        </CountWrapper>
      )}
      <WrapperTop flex={1}>
        <Block padding={16} flex={1} alignItems="flex-start" paddingTop={50}>
          {item.IS_NEW && (
            <Bubble backgroundColor={Colors.mainPrimary}>
              <Typography.B11 color={Colors.white}>{t('new')}</Typography.B11>
            </Bubble>
          )}
          {item.IS_SALE && (
            <Bubble backgroundColor="#F2994A">
              <Typography.B11 color={Colors.white}>{t('sale')}</Typography.B11>
            </Bubble>
          )}
        </Block>
      </WrapperTop>
      <WrapperBottom paddingVertical={16}>
        {!!item.PRICE && (
          <Row justifyContent="flex-start" marginBottom={20}>
            <Row padding={5} alignItems="center" backgroundColor={Colors.white}>
              <Typography.B24>{item.PRICE}</Typography.B24>
            </Row>
          </Row>
        )}
        {!!item.TEXT && (
          <Row justifyContent="flex-start" marginBottom={30}>
            <Text
              padding={5}
              alignItems="center"
              backgroundColor={Colors.white}>
              <Typography.B14 numberOfLines={3} color={Colors.mainPrimary}>
                {item.TEXT}
              </Typography.B14>
            </Text>
          </Row>
        )}
        <Button
          marginHorizontal={16}
          marginTop={30}
          title={t('addToCard')}
          onPress={() => addToCard(item)}
        />
      </WrapperBottom>
    </Wrapper>
  );
};

const Text = styled(Row)`
  width: 66%;
`;

const StyledImage = styled(Image)`
  width: ${WINDOW_WIDTH}px;
  flex: 1;
`;

const Bubble = styled(Block)`
  height: 20px;
  margin: 3px 0;
  padding: 0 5px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

const WrapperTop = styled(Block)`
  position: absolute;
  top: 0;
  left: 0;
`;

const WrapperBottom = styled(Block)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`;

const StyledRoundButton = styled(Block)`
  position: absolute;
  right: 0;
  top: 0;
`;

const CountWrapper = styled(Block)`
  position: absolute;
  right: 0;
  top: 0;
  background-color: ${Colors.mainPrimary};
  width: 60px;
  height: 60px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
`;

const Count = styled(Block)`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 8px;
  right: 8px;
  overflow: hidden;
  border-width: 1px;
  border-color: ${Colors.white};
`;

const Wrapper = styled(Block)<{height?: number}>`
  height: ${({height}) => (height ? `${height}px` : '100%')};
`;
