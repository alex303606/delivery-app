import React from 'react';
import {Block, Typography} from './helpers';
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
    <Block marginBottom={15}>
      <Typography.R14
        marginBottom={5}
        marginLeft={20}
        numberOfLines={1}
        color={Colors.grey}>
        {label || ''}
      </Typography.R14>
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
  );
};

const Input = styled(TextInput)<{error?: boolean; editable?: boolean}>`
  height: 50px;
  border-radius: 10px;
  border-width: 2px;
  border-color: ${({error}) =>
    error ? Colors.notificationError : Colors.transparent}
  padding: 0 20px;
  background-color: ${Colors.white};
  font-size: 14px;
  font-family: 'SBSansDisplay-SemiBold';
  color: ${({editable}) => (editable ? Colors.black : Colors.grey)};
  elevation: 8;
`;
