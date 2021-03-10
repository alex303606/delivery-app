import React from 'react';
import {Block, Row, Typography} from './helpers';
import {Colors} from '@config';
import styled from 'styled-components';
import {TextInput, TextInputProps} from 'react-native';

type Props = {
  value: string;
  changeValue: (s: string) => void;
  placeholder: string;
  label: string;
  error?: boolean;
  disabled?: boolean;
} & TextInputProps;

export const InputField: React.FC<Props> = ({
  value,
  changeValue,
  placeholder,
  label,
  error,
  disabled = false,
  ...props
}) => {
  return (
    <Row
      paddingHorizontal={16}
      alignItems="flex-end"
      justifyContent="space-between">
      <Block flex={1}>
        <Row marginBottom={5}>
          <Typography.R14 numberOfLines={2} color={Colors.black}>
            {label || ''}
          </Typography.R14>
        </Row>
      </Block>
      <Block>
        <Input
          error={error}
          {...props}
          editable={!disabled}
          value={value}
          onChangeText={changeValue}
          placeholder={placeholder}
          placeholderTextColor={Colors.grey}
          underlineColorAndroid="transparent"
        />
      </Block>
    </Row>
  );
};

const Input = styled(TextInput)<{error?: boolean; editable?: boolean}>`
  height: 50px;
  font-size: 14px;
  width: 200px;
  text-align: right;
  font-family: 'SBSansDisplay-SemiBold';
  color: ${({editable}) => (editable ? Colors.black : Colors.black)};
`;
