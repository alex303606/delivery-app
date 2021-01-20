import React from 'react';
import {Block, Row, Typography} from '@components';
import {Colors} from '@config';
import styled from 'styled-components';
import {Pressable} from 'react-native';
import {useAppearance} from '@hooks';
import {useTranslation} from 'react-i18next';

type Props = {
  setFilter: (s: string) => void;
  filter: string;
};

export const Filter: React.FC<Props> = ({setFilter, filter}) => {
  const {textColor, themeIsLight} = useAppearance();
  const {t} = useTranslation();
  const backgroundColor = themeIsLight ? Colors.black : Colors.white;
  const color = themeIsLight ? Colors.white : Colors.black;
  return (
    <Row
      paddingVertical={16}
      paddingHorizontal={8}
      justifyContent="space-between">
      <StyledBlock
        backgroundColor={filter === 'N' ? backgroundColor : Colors.transparent}
        borderColor={backgroundColor}
        overflow
        borderRadius={15}>
        <StyledPressable onPress={() => setFilter('N')}>
          <Typography.S14
            numberOfLines={1}
            color={filter === 'N' ? color : textColor}>
            {t('newOrderFilter')}
          </Typography.S14>
        </StyledPressable>
      </StyledBlock>
      <StyledBlock
        backgroundColor={filter === 'S' ? backgroundColor : Colors.transparent}
        borderColor={backgroundColor}
        overflow
        borderRadius={15}>
        <StyledPressable onPress={() => setFilter('S')}>
          <Typography.S14
            numberOfLines={1}
            color={filter === 'S' ? color : textColor}>
            {t('sendedOrderFilter')}
          </Typography.S14>
        </StyledPressable>
      </StyledBlock>
    </Row>
  );
};

const StyledPressable = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.ripple,
  },
}))`
  padding: 0 10px;
  align-items: center;
  justify-content: center;
  height: 30px;
`;

const StyledBlock = styled(Block)<{borderColor: string}>`
border-color: ${({borderColor}) => borderColor}
border-width: 1px;
  width: 45%;
`;
