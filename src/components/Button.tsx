import React, {useCallback} from 'react';
import styled from 'styled-components';
import {ActivityIndicator, Pressable} from 'react-native';
import {Colors} from '@config';
import {Typography, Block, SpacingsProps} from '@components';

type Props = {
  title: string;
  color?: string;
  textColor?: string;
  disabled?: boolean;
  loading?: boolean;
  small?: boolean;
  onPress: () => void;
} & SpacingsProps;

export const Button: React.FC<Props> = ({
  title,
  color = Colors.mainPrimary,
  textColor = Colors.white,
  onPress,
  disabled,
  loading,
  small = false,
  ...props
}) => {
  const onPressHandler = useCallback(() => {
    return disabled || loading ? undefined : onPress();
  }, [disabled, loading, onPress]);

  return (
    <Block overflow borderRadius={25} {...props}>
      <StyledPressable
        small={small}
        color={color}
        disabled={disabled}
        onPress={onPressHandler}>
        {loading ? (
          <ActivityIndicator size="large" color={'white'} />
        ) : small ? (
          <Typography.S11 color={textColor}>{title}</Typography.S11>
        ) : (
          <Typography.S14 color={textColor}>{title}</Typography.S14>
        )}
      </StyledPressable>
    </Block>
  );
};

const StyledPressable = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.ripple,
  },
}))<{small: boolean; disabled?: boolean; color: string}>`
  flex-direction: row;
  padding: 5px;
  align-items: center;
  justify-content: center;
  height: ${({small}) => (small ? 33 : 48)}px;
  opacity: ${({disabled}) => (disabled ? 0.7 : 1)}
  background-color: ${({color}) => color};
`;
