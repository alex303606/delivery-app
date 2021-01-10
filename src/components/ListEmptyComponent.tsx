import React from 'react';
import {Block, Typography} from './helpers';
import {Image} from 'react-native';
import styled from 'styled-components';
import {useAppearance} from '@hooks';
const empty = require('@assets/images/empty.png');

export const ListEmptyComponent: React.FC<{title: string}> = ({title}) => {
  const {textColor} = useAppearance();

  return (
    <Block flex={1} padding={16} justifyContent="center" alignItems="center">
      <StyledImage resizeMode="contain" source={empty} />
      <Typography.B16 paddingHorizontal={16} color={textColor}>
        {title}
      </Typography.B16>
    </Block>
  );
};

const StyledImage = styled(Image)`
  width: 155px;
  margin-bottom: 50px;
`;
