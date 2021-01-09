import React from 'react';
import {useTranslation} from 'react-i18next';
import {Block, Button, Typography} from '@components';
import styled from 'styled-components';
import {Image, ImageBackground, ScrollView} from 'react-native';
import {FavoriteScreenProps} from '@interfaces';
import {getImage} from '@utils';
import {Colors, WINDOW_WIDTH} from '@config';

type Props = {} & FavoriteScreenProps;

export const FavoriteScreen: React.FC<Props> = (props) => {
  const {t} = useTranslation();
  const {
    route: {
      params: {item},
    },
  } = props;
  return (
    <Block flex={1}>
      <ScrollView
        horizontal={true}
        disableIntervalMomentum={true}
        decelerationRate="normal"
        snapToInterval={WINDOW_WIDTH}
        contentContainerStyle={{flexGrow: 1}}
        showsHorizontalScrollIndicator={false}>
        {item.PICTURES.map((image) => (
          <StyledImage
            key={image}
            resizeMode="cover"
            source={getImage(image)}
          />
        ))}
      </ScrollView>
      <WrapperTop flex={1}>
        <Block padding={16} flex={1} alignItems="flex-start" paddingTop={50}>
          {item.IS_NEW && (
            <Bubble backgroundColor={Colors.mainPrimary}>
              <Typography.B11 color={Colors.white}>Новинка</Typography.B11>
            </Bubble>
          )}
          {item.IS_SALE && (
            <Bubble backgroundColor="#F2994A">
              <Typography.B11 color={Colors.white}>Супер цена</Typography.B11>
            </Bubble>
          )}
        </Block>
      </WrapperTop>
      <WrapperBottom padding={16}>
        <Button marginTop={30} title={t('addToCard')} onPress={() => {}} />
      </WrapperBottom>
    </Block>
  );
};

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
