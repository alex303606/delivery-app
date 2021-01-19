import React, {useCallback, useEffect, useState} from 'react';
import {Block, Button, PersonalDataForm, ScrollContainer} from '@components';
import {useLoading} from '@hooks';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {RootState} from 'src/store/configureStore';
import {useNavigation} from '@react-navigation/native';
import {newOrder, clearCard} from '@actions';
import {EScreens} from '@interfaces';
type Props = {
  newOrder: (comment?: string) => Promise<any>;
  clearCard: () => void;
} & RootState;

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      newOrder,
      clearCard,
    },
    dispatch,
  );
};

const mapState = (state: RootState) => ({
  profile: state.profile,
});

const connector = connect(mapState, mapDispatchToProps);

const NewOrdersScreenComponent: React.FC<Props> = (props) => {
  const {firstname, lastname, city, phone} = props.profile;
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [name, setName] = useState<string>(firstname || '');
  const [lastName, setLastName] = useState<string>(lastname || '');
  const [town, setTown] = useState<string>(city || '');
  const error = town.length < 2 || name.length < 2 || lastName.length < 2;
  const {loading, showLoader, hideLoader} = useLoading();
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setName(firstname || '');
    setLastName(lastname || '');
    setTown(city || '');
  }, [city, firstname, lastname]);

  const newOrderHandler = useCallback(() => {
    showLoader();
    props.newOrder().then((res) => {
      hideLoader();
      if (res.result) {
        props.clearCard();
        return navigation.navigate(EScreens.ORDER_COMPLETE_SCREEN);
      }
      setErrorMessage(res.message);
    });
  }, [hideLoader, navigation, props, showLoader]);

  return (
    <Block flex={1} paddingVertical={16}>
      <ScrollContainer>
        <PersonalDataForm
          disabledAllFields={true}
          name={name}
          lastName={lastName}
          phone={phone}
          town={town}
          errorMessage={error ? t('emptyDataError') : errorMessage}
          setLastName={setLastName}
          setName={setName}
          setTown={setTown}
        />
        <Block paddingHorizontal={16}>
          <Button
            loading={loading}
            disabled={error}
            title={t('sendOrder')}
            onPress={newOrderHandler}
          />
        </Block>
      </ScrollContainer>
    </Block>
  );
};

// @ts-ignore
export const NewOrdersScreen = connector(NewOrdersScreenComponent);
