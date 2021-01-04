import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {EScreens} from '@interfaces';
import {useTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';
import {logOut} from '@actions';
import {connect, ConnectedProps} from 'react-redux';
import {Block, Button} from '@components';
import {Colors} from '@config';
import {UseAppearance} from '@hooks';

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

const HomeScreenComponent: React.FC<Props> = (props) => {
  const {navigate} = useNavigation();
  const {i18n} = useTranslation();
  const {backgroundColor, textColor} = UseAppearance();

  return (
    <Block
      backgroundColor={backgroundColor}
      flex={1}
      justifyContent="space-around"
      padding={16}>
      <Button title="Go to en" onPress={() => i18n.changeLanguage('en')} />
      <Button title="Go to ru" onPress={() => i18n.changeLanguage('ru')} />
      <Button
        title="Navigate to SEARCH"
        onPress={() => navigate(EScreens.CATALOG_STACK)}
      />
      <Button title="Log Out" onPress={() => props.logOut()} />
    </Block>
  );
};

// @ts-ignore
export const HomeScreen = connector(HomeScreenComponent);
