import React from 'react';
import {Block, Typography} from './helpers';
import {Colors} from '@config';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';
import {Pressable} from 'react-native';
import {useAppearance} from '@hooks';

type Props = {
  title: string;
  description: string;
  onPress: () => void;
};

export const RowButton: React.FC<Props> = ({title, description, onPress}) => {
  const {textColor} = useAppearance();

  return (
    <Block borderRadius={5} overflow={true}>
      <StyledPressable onPress={onPress}>
        <Block flex={1}>
          <Typography.B16 color={textColor}>{title}</Typography.B16>
          <Typography.R14 color={Colors.grey}>{description}</Typography.R14>
        </Block>
        <IonicIcon
          size={26}
          color={Colors.grey}
          name={'chevron-forward-outline'}
        />
      </StyledPressable>
    </Block>
  );
};

const StyledPressable = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.ripple,
  },
}))`
  flex-direction: row;
  padding: 16px;
  align-items: center;
`;
