import React from 'react';
import styled from 'styled-components';
import {Switch, View} from 'react-native';
import {Colors} from '@config';
import {Row, Typography} from './helpers';
import {useAppearance} from '@hooks';

const trackColor = {
  true: 'rgba(155,155,155,0.3)',
  false: 'rgba(155,155,155,0.3)',
};

type Props = {
  onValueChange: (v: boolean) => void;
  value: boolean;
  text: string;
};

export const SwitchComponent: React.FC<Props> = ({
  onValueChange,
  value,
  text,
}) => {
  const {textColor} = useAppearance();

  return (
    <Row alignItems="center" marginVertical={10}>
      <TextContainer>
        <Typography.B14 color={textColor} numberOfLines={1}>
          {text}
        </Typography.B14>
      </TextContainer>
      <Switch
        trackColor={trackColor}
        thumbColor={value ? '#2AA952' : Colors.white}
        value={value}
        onValueChange={onValueChange}
      />
    </Row>
  );
};

const TextContainer = styled(View)`
  padding-right: 16px;
  flex: 1;
`;
