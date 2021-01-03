import React, {useCallback} from 'react';
import styled from 'styled-components';
import {ActivityIndicator, Pressable} from 'react-native';
import {Colors} from '@config';
import {Typography, Block, SpacingsProps} from '@components';

type Props = {
  title: string;
  disabled?: boolean;
  loading?: boolean;
  onPress: () => void;
} & SpacingsProps;

export const Button: React.FC<Props> = ({
  title,
  onPress,
  disabled,
  loading,
  ...props
}) => {
  const onPressHandler = useCallback(() => {
    return disabled ? undefined : onPress();
  }, [disabled, onPress]);

  return (
    <Block overflow borderRadius={25} {...props}>
      <StyledPressable disabled={disabled} onPress={onPressHandler}>
        {loading ? (
          <ActivityIndicator size="large" color={'white'} />
        ) : (
          <Typography.S14 color={Colors.white}>{title}</Typography.S14>
        )}
      </StyledPressable>
    </Block>
  );
};

const StyledPressable = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.grey,
  },
}))<{disabled?: boolean}>`
  flex-direction: row;
  padding: 5px;
  align-items: center;
  justify-content: center;
  height: 48px;
  opacity: ${({disabled}) => (disabled ? 0.7 : 1)}
  background-color: ${Colors.mainPrimary};
`;
