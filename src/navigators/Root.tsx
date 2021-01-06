import React, {useEffect} from 'react';
import {EScreens, RootStackParamList} from '@interfaces';
import {AuthStack, RootTabs} from '@navigators';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {connect} from 'react-redux';
import {IProfileState} from 'src/store/reducers/profile';
import {bindActionCreators} from 'redux';
import {
  getSections,
  getUser,
  IGetCatalog,
  IGetUser,
  updateUserDate,
} from '@actions';
import {RootState} from 'src/store/configureStore';
import {useAppearance, useLoading} from '@hooks';
import {Loader} from '@components';
import {Colors} from '@config';
import {PersonalDataScreen} from '@screens';
const Stack = createStackNavigator<RootStackParamList>();

type Props = {
  getSections: IGetCatalog;
  getUser: IGetUser;
  updateUserDate: () => Promise<any>;
} & IProfileState;

const mapState = (state: RootState) => ({
  userIsLoggedIn: state.profile.userIsLoggedIn,
});

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getSections,
      getUser,
      updateUserDate,
    },
    dispatch,
  );
};

const connector = connect(mapState, mapDispatchToProps);

export const RootStack: React.FC<Props> = (props) => {
  const {loading, showLoader, hideLoader} = useLoading();
  const {themeIsLight} = useAppearance();
  useEffect(() => {
    if (props.userIsLoggedIn) {
      showLoader();
      Promise.all([
        props.getSections(),
        props.getUser(),
        props.updateUserDate(),
      ]).then(() => {
        hideLoader();
      });
    }
  }, [hideLoader, props, showLoader]);
  if (loading) {
    return <Loader background={Colors.black} color={Colors.white} />;
  }
  return (
    <Stack.Navigator mode="modal" headerMode="none">
      <Stack.Screen
        name={EScreens.ROOT_TABS}
        component={props.userIsLoggedIn ? RootTabs : AuthStack}
      />
      <Stack.Screen
        name={EScreens.FIRST_DATA_SCREEN}
        component={PersonalDataScreen}
        initialParams={{newUser: true}}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: themeIsLight ? Colors.background : Colors.black,
            elevation: 0,
            borderBottomWidth: 0,
          },
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
    </Stack.Navigator>
  );
};

// @ts-ignore
export const Root = connector(RootStack);
