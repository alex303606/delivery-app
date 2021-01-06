import React, {useCallback, useEffect, useState} from 'react';
import {Block, Button, ScrollContainer, Typography} from '@components';
import {useAppearance, useLoading} from '@hooks';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {RootState} from 'src/store/configureStore';
import {editUser, getUser, IGetUser, IEditUser} from '@actions';
import {useNavigation} from '@react-navigation/native';
import {RefreshControl} from 'react-native';
import {PersonalDataForm} from './PersonalDataForm';
import {PersonalDataScreenProps} from '@interfaces';

type Props = {
  getUser: IGetUser;
  editUser: IEditUser;
} & RootState &
  PersonalDataScreenProps;

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      editUser,
      getUser,
    },
    dispatch,
  );
};

const mapState = (state: RootState) => ({
  profile: state.profile,
});

const connector = connect(mapState, mapDispatchToProps);

const PersonalDataScreenComponent: React.FC<Props> = (props) => {
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
  const [name, setName] = useState<string>(firstname || '');
  const [lastName, setLastName] = useState<string>(lastname || '');
  const [town, setTown] = useState<string>(city || '');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const error = town.length < 3 || name.length < 3 || lastName.length < 3;

  useEffect(() => {
    setName(firstname);
    setLastName(lastname);
    setTown(city);
  }, [city, firstname, lastname]);

  const save = useCallback(() => {
    if (error) {
      return;
    }
    showLoader();
    props
      .editUser({
        lastname: lastName,
        firstname: name,
        city: town,
        phone: phone,
        push_new_arrival,
        push_sale,
        sms,
      })
      .then((res) => {
        if (res.result) {
          return props.getUser().then((data) => {
            setErrorMessage(data.message);
            if (data.result) {
              navigation.goBack();
            }
          });
        }
        hideLoader();
        setErrorMessage(res.message);
      });
  }, [
    error,
    hideLoader,
    lastName,
    name,
    navigation,
    phone,
    props,
    push_new_arrival,
    push_sale,
    showLoader,
    sms,
    town,
  ]);

  const reload = useCallback(() => {
    showLoader();
    props.getUser().then(() => {
      hideLoader();
    });
  }, [hideLoader, props, showLoader]);

  const {
    route: {
      params: {newUser},
    },
  } = props;

  return (
    <Block flex={1} padding={16} paddingTop={newUser ? 100 : 0}>
      {newUser && (
        <Typography.B34 color={textColor}>{t('welcome')}</Typography.B34>
      )}
      <Typography.B24 color={textColor}>{t('personalData')}</Typography.B24>
      <ScrollContainer
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={reload} />
        }>
        <PersonalDataForm
          name={name}
          lastName={lastName}
          phone={phone}
          town={town}
          errorMessage={errorMessage}
          setLastName={setLastName}
          setName={setName}
          setTown={setTown}
        />
        <Button
          loading={loading}
          disabled={error}
          marginTop={30}
          title={t('save')}
          onPress={save}
        />
      </ScrollContainer>
    </Block>
  );
};

// @ts-ignore
export const PersonalDataScreen = connector(PersonalDataScreenComponent);
