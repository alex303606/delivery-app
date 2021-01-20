import React, {useEffect} from 'react';
import {EScreens, RootStackParamList} from '@interfaces';
import {AuthStack, RootTabs} from '@navigators';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
import {IProfileState} from 'src/store/reducers/profile';
import {bindActionCreators} from 'redux';
import {
  getAppData,
  getSections,
  getUser,
  IGetCatalog,
  IGetUser,
  updateUserDate,
  getFavorites,
  getOrders,
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
  getAppData: () => Promise<any>;
  getFavorites: () => Promise<any>;
  getOrders: () => Promise<any>;
} & IProfileState;

const mapState = (state: RootState) => ({
  userIsLoggedIn: state.profile.userIsLoggedIn,
  newUser: state.profile.newUser,
});

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getSections,
      getUser,
      updateUserDate,
      getAppData,
      getFavorites,
      getOrders,
    },
    dispatch,
  );
};

const connector = connect(mapState, mapDispatchToProps);

export const RootStack: React.FC<Props> = (props) => {
  const {loading, showLoader, hideLoader} = useLoading();
  const {themeIsLight, backgroundColor} = useAppearance();
  useEffect(() => {
    if (props.userIsLoggedIn) {
      showLoader();
      Promise.all([
        props.getSections(),
        props.getUser(),
        props.updateUserDate(),
        props.getAppData(),
        props.getFavorites(),
        props.getOrders(),
      ]).then(() => {
        hideLoader();
      });
    }
  }, [hideLoader, props, showLoader]);
  if (loading) {
    return <Loader background={backgroundColor} color={Colors.white} />;
  }
  return (
    <Stack.Navigator
      mode="modal"
      headerMode="none"
      initialRouteName={
        props.newUser ? EScreens.FIRST_DATA_SCREEN : EScreens.ROOT_TABS
      }>
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
        }}
      />
    </Stack.Navigator>
  );
};

// @ts-ignore
export const Root = connector(RootStack);
