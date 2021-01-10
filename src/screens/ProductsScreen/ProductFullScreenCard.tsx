import React from 'react';
import {IProduct} from 'src/store/reducers/favoritest';
import {Image, ScrollView} from 'react-native';
import {Colors, WINDOW_WIDTH} from '@config';
import {getImage} from '@utils';
import {Block, Button, Typography} from '@components';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

type Props = {
  item: IProduct;
  index: number;
  layoutHeight: number;
};

export const ProductFullScreenCard: React.FC<Props> = ({
  item,
  index,
  layoutHeight,
}) => {
  const {t} = useTranslation();

  return (
    <Wrapper height={layoutHeight}>
      <ScrollView
        horizontal={true}
        disableIntervalMomentum={true}
        decelerationRate="fast"
        snapToInterval={WINDOW_WIDTH}
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        {item.PICTURES.map((image: string, i: number) => (
          <StyledImage
            height={layoutHeight}
            key={i}
            resizeMode="cover"
            source={getImage(image)}
          />
        ))}
      </ScrollView>
      <WrapperTop flex={1}>
        <Block padding={16} flex={1} alignItems="flex-start" paddingTop={50}>
          {item.IS_NEW && (
            <Bubble backgroundColor={Colors.mainPrimary}>
              <Typography.B11 color={Colors.white}>
                {t('new')} {index}
              </Typography.B11>
            </Bubble>
          )}
          {item.IS_SALE && (
            <Bubble backgroundColor="#F2994A">
              <Typography.B11 color={Colors.white}>{t('sale')}</Typography.B11>
            </Bubble>
          )}
        </Block>
      </WrapperTop>
      <WrapperBottom padding={16}>
        <Button marginTop={30} title={t('addToCard')} onPress={() => {}} />
      </WrapperBottom>
    </Wrapper>
  );
};

const StyledImage = styled(Image)<{height: number}>`
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

const Wrapper = styled(Block)<{height: number}>`
  height: ${({height}) => height}px;
`;
