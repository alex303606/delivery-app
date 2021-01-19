import React from 'react';
import {Block, Typography} from './helpers';
import {Image} from 'react-native';
import styled from 'styled-components';
import {useAppearance} from '@hooks';
import {Button} from '@components';
const empty = require('@assets/images/empty.png');

type Props = {
  title: string;
  bigTitle?: string;
  buttonTitle?: string;
  onPress?: () => void;
};

export const ListEmptyComponent: React.FC<Props> = ({
  bigTitle,
  title,
  buttonTitle,
  onPress,
}) => {
  const {textColor} = useAppearance();

  return (
    <Block flex={1} paddingVertical={16} paddingHorizontal={8}>
      <Block flex={1} justifyContent="center" alignItems="center">
        <StyledImage resizeMode="contain" source={empty} />
        {!!bigTitle && (
          <Typography.B34
            textAlign="center"
            paddingHorizontal={16}
            color={textColor}>
            {bigTitle}
          </Typography.B34>
        )}
        <Typography.B16
          textAlign="center"
          paddingHorizontal={16}
          color={textColor}>
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
