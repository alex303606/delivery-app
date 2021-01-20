import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Block, PhoneInput, Typography, Button} from '@components';
import {useTranslation} from 'react-i18next';
import {Colors, COUNTRIES, STATUSBAR_HEIGHT} from '@config';
import {IHandles} from 'react-native-modalize/lib/options';
import {SelectCountryModal} from './components/SelectCountryModal';
import {ICountry} from './interfaces';
import {Keyboard} from 'react-native';
import {phoneIsValid, parsePhoneToString} from '@utils';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ISendPhoneNumber, sendPhone} from '@actions';
import {useAppearance, useLoading} from '@hooks';
import {
  CodeFieldComponent,
  ICodeFieldComponent,
} from './components/CodeFieldComponent';
const CELL_COUNT = 4;

type Props = {
  sendPhone: ISendPhoneNumber;
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      sendPhone,
    },
    dispatch,
  );
};

const connector = connect(null, mapDispatchToProps);

const LoginScreenComponent: React.FC<Props> = (props) => {
  const {t} = useTranslation();
  const {textColor} = useAppearance();
  const {loading, hideLoader, showLoader} = useLoading();
  const modalRef = useRef<IHandles>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [country, setCountry] = useState<ICountry>(COUNTRIES[0]);
  const [code, setCode] = useState('');
  const codeRef = useRef<ICodeFieldComponent>(null);

  useEffect(() => {
    if (errorMessage) {
      setErrorMessage('');
    }
  }, [phone, code]);

  const setPhoneHandler = useCallback((value) => {
    return setPhone(value);
  }, []);

  const onPressFlagHandler = useCallback(() => {
    Keyboard.dismiss();
    setTimeout(() => {
      modalRef.current?.open();
    });
  }, [modalRef]);

  const setCountryHandler = useCallback(
    (item: ICountry) => {
      setCountry(item);
      modalRef.current?.close();
    },
    [modalRef],
  );

  const sendPhoneHandler = useCallback(() => {
    if (!phone || !phoneIsValid(phone, country)) {
      codeRef.current?.clear();
      return setErrorMessage(t('phoneIsInvalid'));
    }
    if (code.length !== CELL_COUNT) {
      return setErrorMessage(t('codeIsInvalid'));
    }
    if (code.length === CELL_COUNT) {
      const number = parsePhoneToString(phone, country);
      if (!number) {
        return;
      }
      showLoader();
      props.sendPhone(number, code).then((res) => {
        hideLoader();
        if (!res.result || res.data.black_list) {
          codeRef.current?.clear();
          setErrorMessage(res.message);
        }
      });
    }
  }, [phone, country, code, t, showLoader, props, hideLoader]);

  return (
    <Block paddingHorizontal={16} paddingTop={54 + STATUSBAR_HEIGHT} flex={1}>
      <Typography.B34 color={textColor} marginBottom={35}>
        {t('login')}
      </Typography.B34>
      <Typography.S14 color={textColor} marginBottom={14}>
        {t('enterPhone')}
      </Typography.S14>
      <PhoneInput
        flag={country.flag}
        dialCode={country.dialCode}
        mask={country.mask}
        changeValue={setPhoneHandler}
        value={phone}
        onPressFlag={onPressFlagHandler}
      />
      <CodeFieldComponent value={code} setValue={setCode} ref={codeRef} />
      <Button
        loading={loading}
        marginTop={20}
        title={t('enter')}
        onPress={sendPhoneHandler}
      />
      <Typography.R16
        marginTop={20}
        textAlign="center"
        color={Colors.notificationError}
        marginBottom={14}>
        {errorMessage}
      </Typography.R16>
      <SelectCountryModal ref={modalRef} setCountry={setCountryHandler} />
    </Block>
  );
};

// @ts-ignore
export const LoginScreen = connector(LoginScreenComponent);
