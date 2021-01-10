import React from 'react';
import {Block, Typography} from './helpers';
import {Image} from 'react-native';
import styled from 'styled-components';
import {useAppearance} from '@hooks';
import {Button} from '@components';
const empty = require('@assets/images/empty.png');

type Props = {
  title: string;
  buttonTitle?: string;
  onPress?: () => void;
};

export const ListEmptyComponent: React.FC<Props> = ({
  title,
  buttonTitle,
  onPress,
}) => {
  const {textColor} = useAppearance();

  return (
    <Block flex={1} paddingVertical={16} paddingHorizontal={8}>
      <Block flex={1} justifyContent="center" alignItems="center">
        <StyledImage resizeMode="contain" source={empty} />
        <Typography.B16 paddingHorizontal={16} color={textColor}>
          {title}
        </Typography.B16>
      </Block>
      {buttonTitle && onPress && (
        <Button onPress={onPress} title={buttonTitle} />
      )}
    </Block>
  );
};

const StyledImage = styled(Image)`
  width: 155px;
  margin-bottom: 50px;
`;
