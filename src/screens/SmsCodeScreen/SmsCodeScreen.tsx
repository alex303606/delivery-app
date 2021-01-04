import React, {useEffect, useState, useCallback} from 'react';
import {bindActionCreators} from 'redux';
import {connect, ConnectedProps} from 'react-redux';
import {Block, Typography, Loader} from '@components';
import {Colors} from '@config';
import {useTranslation} from 'react-i18next';
import {useLoading} from '@hooks';
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {CodeRootComponent} from './components/CodeRootComponent';
import {SmsCodeCell} from './components/SmsCodeCell';
import {
  confirmationCode,
  ISendCode,
  ISendPhoneNumber,
  sendPhone,
} from '@actions';
import {AuthorizationScreenProps} from '@interfaces';
import styled from 'styled-components';
import {View} from 'react-native';
import {ResendCodeButton} from './components/ResendCodeButton';

const CELL_COUNT = 4;

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      confirmationCode,
      sendPhone,
    },
    dispatch,
  );
};

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = {
  confirmationCode: ISendCode;
  sendPhone: ISendPhoneNumber;
} & PropsFromRedux &
  AuthorizationScreenProps;

const SmsCodeScreenComponent: React.FC<Props> = (screenProps) => {
  const {
    route: {
      params: {phone, currentTimeInMillis},
    },
  } = screenProps;
  const {t} = useTranslation();
  const {loading, showLoader, hideLoader} = useLoading();
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [startTime, setStartTime] = useState(currentTimeInMillis);
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    if (value.length === CELL_COUNT && phone) {
      screenProps.confirmationCode(phone, value).then((res) => {
        if (res && !res.result) {
          setErrorMessage(res.message);
        }
        hideLoader();
      });
    }
  }, [hideLoader, phone, screenProps, showLoader, value]);

  useEffect(() => {
    return function cleanup() {
      hideLoader();
    };
  });

  const resendCodeHandler = useCallback(() => {
    showLoader();
    screenProps.sendPhone(phone).then((res) => {
      if (!res.result || res.data.black_list) {
        setErrorMessage(res.message);
      }
      hideLoader();
      setStartTime(Date.now());
    });
  }, [phone, sendPhone]);

  const renderCell = ({
    index,
    symbol,
    isFocused,
  }: {
    index: number;
    symbol: string;
    isFocused: boolean;
  }) => (
    <SmsCodeCell
      key={index.toString()}
      getCellOnLayoutHandler={getCellOnLayoutHandler}
      index={index}
      symbol={symbol}
      isFocused={isFocused}
    />
  );

  return (
    <Block
      flex={1}
      backgroundColor={Colors.background}
      paddingTop={13}
      paddingHorizontal={16}>
      {loading && (
        <Wrapper>
          <Loader color={Colors.mainPrimary} background={Colors.transparent} />
        </Wrapper>
      )}
      <Typography.B18 marginVertical={14}>
        {t('phoneNumberVerification')}
      </Typography.B18>
      <Typography.R16 color={Colors.grey}>{t('enterSmsCode')}</Typography.R16>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        RootComponent={CodeRootComponent}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={renderCell}
      />
      <ResendCodeButton
        resendCode={resendCodeHandler}
        loading={loading}
        startTimeInMillis={startTime}
        timeout={30}
      />
      <Typography.R16
        marginTop={20}
        textAlign="center"
        color={Colors.notificationError}
        marginBottom={14}>
        {errorMessage}
      </Typography.R16>
    </Block>
  );
};

// @ts-ignore
export const SmsCodeScreen = connector(SmsCodeScreenComponent);

const Wrapper = styled(View)`
  position: absolute;
  flex: 1;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
`;
