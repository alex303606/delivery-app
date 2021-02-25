import React from 'react';
import {Block, Typography} from './helpers';
import {Colors} from '@config';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';
import {Pressable} from 'react-native';
import {useAppearance} from '@hooks';

type Props = {
  title: string;
  description?: string;
  onPress: () => void;
  icon?: boolean;
};

export const RowButton: React.FC<Props> = ({
  title,
  description,
  onPress,
  icon = true,
}) => {
  const {textColor} = useAppearance();

  return (
    <Block borderRadius={5} overflow={true}>
      <StyledPressable onPress={onPress}>
        <Block flex={1}>
          <Typography.R14 color={textColor}>{title}</Typography.R14>
          {description && (
            <Typography.R14 color={Colors.grey}>{description}</Typography.R14>
          )}
        </Block>
        {icon && (
          <IonicIcon
            size={26}
            color={Colors.darkGreen}
            name={'chevron-forward-outline'}
          />
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
}))`
  flex-direction: row;
  padding: 16px;
  align-items: center;
`;
