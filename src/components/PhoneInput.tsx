import React from 'react';
import {Row, Block} from '@components';
import styled from 'styled-components';
import {TextInputMask} from 'react-native-masked-text';
import {Pressable, Text} from 'react-native';
import {Colors} from '@config';

interface Props {
  value: string;
  mask: string;
  flag: string;
  dialCode: string;
  changeValue: (s: string) => void;
  onPressFlag: () => void;
}

export const PhoneInput: React.FC<Props> = ({
  value,
  mask,
  flag,
  dialCode,
  changeValue,
  onPressFlag,
}) => {
  return (
    <Block>
      <Row
        overflow
        borderRadius={10}
        backgroundColor={Colors.white}
        elevation={8}>
        <Block overflow borderRadius={10}>
          <StyledPressable onPress={onPressFlag}>
            <Flag>{flag}</Flag>
          </StyledPressable>
        </Block>
        <DialCode>{dialCode}</DialCode>
        <Input
          placeholder={mask}
          keyboardType="phone-pad"
          underlineColorAndroid="transparent"
          autoCorrect={false}
          type={'custom'}
          options={{mask}}
          onChangeText={changeValue}
          value={value}
          autoCompleteType={'tel'}
        />
      </Row>
    </Block>
  );
};

const Input = styled(TextInputMask)`
  flex: 1;
  height: 50px;
  font-size: 20px;
  padding: 0 5px;
`;

const Flag = styled(Text)`
  font-size: 25px;
  line-height: 50px;
`;

const DialCode = styled(Text)`
  font-size: 20px;
  line-height: 50px;
`;
77;
const StyledPressable = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.grey,
  },
}))`
  flex-direction: row;
  padding: 5px;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
`;
