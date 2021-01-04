import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Block, PhoneInput, Typography, Button} from '@components';
import {useTranslation} from 'react-i18next';
import {Colors, COUNTRIES} from '@config';
import {IHandles} from 'react-native-modalize/lib/options';
import {SelectCountryModal} from './SelectCountryModal';
import {ICountry} from './interfaces';
import {Keyboard} from 'react-native';
import {phoneIsValid, parsePhoneToString} from '@utils';
import {connect, ConnectedProps} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ISendPhoneNumber, sendPhone} from '@actions';
import {useNavigation} from '@react-navigation/native';
import {EScreens} from '@interfaces';
import {useLoading} from '@hooks';

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      sendPhone,
    },
    dispatch,
  );
};

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = {
  sendPhone: ISendPhoneNumber;
} & PropsFromRedux;

const LoginScreenComponent: React.FC<Props> = (props) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {loading, hideLoader, showLoader} = useLoading();
  const modalRef = useRef<IHandles>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [country, setCountry] = useState<ICountry>(COUNTRIES[0]);

  useEffect(() => {
    if (errorMessage) {
      setErrorMessage('');
    }
  }, [phone]);

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

  useEffect(() => {
    return function cleanup() {
      hideLoader();
    };
  });

  const sendPhoneHandler = useCallback(() => {
    const number = parsePhoneToString(phone, country);
    if (!number) {
      return;
    }
    showLoader();
    props.sendPhone(number).then((res) => {
      if (res && res.result) {
        navigation.navigate(EScreens.SMS_CODE_SCREEN, {
          phone: parsePhoneToString(phone, country),
        });
      }
      if (!res.result || res.data.black_list) {
        setErrorMessage(res.message);
      }
      hideLoader();
    });
  }, [phone, country, showLoader, props, hideLoader, navigation]);

  return (
    <Block
      backgroundColor={Colors.background}
      paddingHorizontal={16}
      paddingTop={54}
      flex={1}>
      <Typography.B34 marginBottom={35}>{t('login')}</Typography.B34>
      <Typography.S14 marginBottom={14}>{t('enterPhone')}</Typography.S14>
      <PhoneInput
        flag={country.flag}
        dialCode={country.dialCode}
        mask={country.mask}
        changeValue={setPhoneHandler}
        value={phone}
        onPressFlag={onPressFlagHandler}
      />
      <Button
        loading={loading}
        disabled={!phoneIsValid(phone, country)}
        marginTop={20}
        title={t('getCode')}
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
