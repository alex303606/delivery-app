import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {EScreens} from '@interfaces';
import {useTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';
import {logOut} from '@actions';
import {connect, ConnectedProps} from 'react-redux';
import {Block, Button} from '@components';

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      logOut,
    },
    dispatch,
  );
};

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = {
  logOut: () => void;
} & PropsFromRedux;

const HomeScreenComponent: React.FC<Props> = ({logOut}) => {
  const {navigate} = useNavigation();
  const {i18n} = useTranslation();

  return (
    <Block flex={1} justifyContent="space-around" padding={16}>
      <Button title="Go to en" onPress={() => i18n.changeLanguage('en')} />
      <Button title="Go to ru" onPress={() => i18n.changeLanguage('ru')} />
      <Button
        title="Navigate to SEARCH"
        onPress={() => navigate(EScreens.SEARCH_STACK)}
      />
      <Button title="Log Out" onPress={() => logOut()} />
    </Block>
  );
};

// @ts-ignore
export const HomeScreen = connector(HomeScreenComponent);
