import React from 'react';
import {Colors} from '@config';
import styled from 'styled-components';
import {Pressable} from 'react-native';
import {Block} from './helpers';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  onPress?: () => void;
  iconColor?: string;
  iconName?: string;
  backgroundColor?: string;
  diameter?: number;
  iconSize?: number;
  elevation?: number;
  paddingLeft?: number;
  position?: string;
  top?: number;
  left?: number;
  right?: number;
};

export const RoundButton: React.FC<Props> = ({
  onPress,
  iconColor = Colors.grey,
  iconName = 'arrow-back-outline',
  diameter = 40,
  iconSize = 26,
  backgroundColor = Colors.transparent,
  elevation,
  paddingLeft = 0,
  position = 'relative',
  top,
  left,
  right,
}) => {
  return (
    <Wrapper
      style={{position, top, left, right: right}}
      elevation={elevation}
      backgroundColor={backgroundColor}
      diameter={diameter}>
      <BackButton diameter={diameter} onPress={onPress}>
        <Icon
          style={{paddingLeft}}
          size={iconSize}
          color={iconColor}
          name={iconName}
        />
      </BackButton>
    </Wrapper>
  );
};

const Wrapper = styled(Block)<{diameter: number}>`
  height: ${({diameter}) => diameter}px;
  width: ${({diameter}) => diameter}px;
  border-radius: ${({diameter}) => diameter / 2}px;
  overflow: hidden;
`;

const BackButton = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.ripple,
  },
}))<{diameter: number}>`
  height: ${({diameter}) => diameter}px;
  width: ${({diameter}) => diameter}px;
  align-items: center;
  justify-content: center;
`;
