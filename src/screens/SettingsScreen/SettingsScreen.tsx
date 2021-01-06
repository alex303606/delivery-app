import React, {useCallback, useEffect, useState} from 'react';
import {
  Block,
  Typography,
  ScrollContainer,
  SwitchComponent,
  Button,
} from '@components';
import {useAppearance, useLoading} from '@hooks';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {RootState} from 'src/store/configureStore';
import {IEditUser, IGetUser, editUser, getUser} from '@actions';
import {EScreens, PersonalDataScreenProps} from '@interfaces';
import {Colors} from '@config';
import {useNavigation} from '@react-navigation/native';

type Props = {
  getUser: IGetUser;
  editUser: IEditUser;
} & RootState &
  PersonalDataScreenProps;

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getUser,
      editUser,
    },
    dispatch,
  );
};

const mapState = (state: RootState) => ({
  profile: state.profile,
});

const connector = connect(mapState, mapDispatchToProps);

const SettingsScreenComponent: React.FC<Props> = (props) => {
  const {
    firstname,
    lastname,
    city,
    phone,
    push_new_arrival,
    push_sale,
    sms,
  } = props.profile;
  const {textColor} = useAppearance();
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {loading, hideLoader, showLoader} = useLoading();
  const [pushNewArrival, setPushNewArrival] = useState<boolean>(
    push_new_arrival,
  );
  const [pushSale, setPushSale] = useState<boolean>(push_sale);
  const [smsNotification, setSms] = useState<boolean>(sms);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setPushNewArrival(push_new_arrival);
    setPushSale(push_sale);
    setSms(sms);
  }, [push_new_arrival, push_sale, sms]);

  const save = useCallback(() => {
    showLoader();
    props
      .editUser({
        lastname,
        firstname,
        city,
        phone: phone,
        push_new_arrival: pushNewArrival,
        push_sale: pushSale,
        sms: smsNotification,
      })
      .then((res) => {
        if (res.result) {
          return props.getUser().then((data) => {
            setErrorMessage(data.message);
            if (data.result) {
              navigation.navigate(EScreens.PROFILE_SCREEN);
            }
          });
        }
        hideLoader();
        setErrorMessage(res.message);
      });
  }, [
    hideLoader,
    navigation,
    pushNewArrival,
    pushSale,
    showLoader,
    smsNotification,
  ]);

  return (
    <Block flex={1} padding={16}>
      <Typography.B34 marginBottom={20} color={textColor}>
        {t('settings')}
      </Typography.B34>
      <ScrollContainer>
        <Typography.B18 marginBottom={20} color={textColor}>
          {t('notificationsText')}
        </Typography.B18>
        <SwitchComponent
          value={pushNewArrival}
          onValueChange={setPushNewArrival}
          text={t('push_new_arrival')}
        />
        <SwitchComponent
          value={pushSale}
          onValueChange={setPushSale}
          text={t('push_sale')}
        />
        <SwitchComponent
          value={smsNotification}
          onValueChange={setSms}
          text={t('sms')}
        />
        <Typography.R16
          marginVertical={20}
          textAlign="center"
          color={Colors.notificationError}
          marginBottom={14}>
          {errorMessage}
        </Typography.R16>
        <Button loading={loading} title={t('save')} onPress={save} />
      </ScrollContainer>
    </Block>
  );
};

// @ts-ignore
export const SettingsScreen = connector(SettingsScreenComponent);
