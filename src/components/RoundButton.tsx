import React from 'react';
import {Colors} from '@config';
import styled from 'styled-components';
import {Pressable} from 'react-native';
import {Block} from './helpers';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  onPress: () => void;
  iconColor: string;
};

export const RoundButton: React.FC<Props> = ({onPress, iconColor}) => {
  return (
    <Wrapper>
      <BackButton onPress={onPress}>
        <Icon size={26} color={iconColor} name={'arrow-back-outline'} />
      </BackButton>
    </Wrapper>
  );
};

const Wrapper = styled(Block)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  overflow: hidden;
`;

const BackButton = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.ripple,
  },
}))`
  height: 40px;
  width: 40px;
  align-items: center;
  justify-content: center;
`;
