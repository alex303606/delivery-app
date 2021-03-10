import React, {useCallback, useEffect, useState} from 'react';
import {
  Block,
  Button,
  ScrollContainer,
  Typography,
  PersonalDataForm,
  Row,
  RoundButton,
} from '@components';
import {useAppearance, useLoading} from '@hooks';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {RootState} from 'src/store/configureStore';
import {
  editUser,
  getUser,
  setUserIsNotNew,
  IEditUser,
  IGetUser,
} from '@actions';
import {useNavigation} from '@react-navigation/native';
import {Image, RefreshControl} from 'react-native';
import {EScreens, PersonalDataScreenProps} from '@interfaces';
import {getImage} from '@utils';
import {Colors} from '@config';
import styled from 'styled-components';
import IonicIcon from 'react-native-vector-icons/Ionicons';

type Props = {
  getUser: IGetUser;
  editUser: IEditUser;
  setUserIsNotNew: () => void;
} & RootState &
  PersonalDataScreenProps;

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      editUser,
      getUser,
      setUserIsNotNew,
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
    id,
  } = props.profile;
  const {
    route: {
      params: {newUser},
    },
  } = props;
  const {textColor} = useAppearance();
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {loading, hideLoader, showLoader} = useLoading();
  const [name, setName] = useState<string>(firstname || '');
  const [lastName, setLastName] = useState<string>(lastname || '');
  const [town, setTown] = useState<string>(city || '');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const error = town.length < 2 || name.length < 2 || lastName.length < 2;

  useEffect(() => {
    setName(firstname || '');
    setLastName(lastname || '');
    setTown(city || '');
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
              props.setUserIsNotNew();
              navigation.navigate(
                newUser ? EScreens.ROOT_TABS : EScreens.PROFILE_SCREEN,
              );
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
    newUser,
  ]);

  const reload = useCallback(() => {
    showLoader();
    props.getUser().then(() => {
      hideLoader();
    });
  }, [hideLoader, props, showLoader]);

  return (
    <ScrollContainer
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={reload} />
      }>
      <Block flex={1} paddingBottom={16} paddingTop={newUser ? 100 : 16}>
        <Block>
          {newUser && (
            <Typography.B34 marginBottom={20} color={textColor}>
              {t('welcome')}
            </Typography.B34>
          )}
          <Block marginBottom={10}>
            <Block
              paddingHorizontal={16}
              alignItems="center"
              justifyContent="space-between">
              <StyledImage
                source={getImage(
                  'https://brandgallery.kido.kg/upload/iblock/5ed/5ed58e9555948282f96570dbaa9caf29.png',
                )}
              />
            </Block>
            <Block
              paddingTop={20}
              paddingHorizontal={16}
              marginLeft={10}
              flex={1}>
              <Row
                marginBottom={10}
                alignItems="center"
                justifyContent="space-between">
                <Row flex={1} paddingRight={30}>
                  <Typography.B18 numberOfLines={2} color={textColor}>
                    Игнатенко Михаил Федорович
                    {/*{firstname || t('firstname')} {lastname || t('lastname')}*/}
                  </Typography.B18>
                </Row>
              </Row>
            </Block>
            <Block paddingHorizontal={16} paddingTop={10} marginLeft={10}>
              <Block marginBottom={10} alignItems="center">
                <Typography.R14
                  color={Colors.grey}>{`ID ${id}`}</Typography.R14>
              </Block>
            </Block>
            <StyledLineBlock>
              <Row paddingHorizontal={16} marginBottom={10}>
                <IonicIcon
                  size={26}
                  color={Colors.darkGreen}
                  name={'chevron-forward-outline'}
                />
              </Row>
            </StyledLineBlock>
          </Block>
          <Row>
            <StyledLineBlock
              paddingTop={15}
              marginTop={10}
              paddingBottom={20}
              flex={1}>
              <Row
                paddingHorizontal={16}
                alignItems="center"
                justifyContent="space-between">
                <Block flex={1} paddingRight={30}>
                  <Block paddingBottom={5}>
                    <Typography.R18 numberOfLines={2} color={textColor}>
                      Заполнено 1 из 6
                    </Typography.R18>
                  </Block>
                  <Block>
                    <Typography.R12 color={Colors.grey}>
                      Заполните данные и подтвердите их, это повысит доверие
                      заказчиков
                    </Typography.R12>
                  </Block>
                </Block>
                <RoundButton
                  iconSize={80}
                  onPress={() =>
                    navigation.navigate(EScreens.PERSONAL_DATA_SCREEN)
                  }
                  iconName="settings-outline"
                  iconColor={Colors.darkGreen}
                  diameter={80}
                />
              </Row>
            </StyledLineBlock>
          </Row>
        </Block>

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
        <Block paddingHorizontal={16}>
          <Button
            loading={loading}
            disabled={error}
            title={t('save')}
            onPress={save}
          />
        </Block>
      </Block>
    </ScrollContainer>
  );
};

const StyledImage = styled(Image)`
  height: 120px;
  width: 120px;
  border-radius: 60px;
`;

const StyledLineBlock = styled(Block)`
  border-bottom-width: 1px;
`;
// @ts-ignore
export const PersonalDataScreen = connector(PersonalDataScreenComponent);
