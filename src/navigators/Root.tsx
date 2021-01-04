import React from 'react';
import {EScreens} from '@interfaces';
import {AuthStack, RootTabs} from '@navigators';
import {createStackNavigator} from '@react-navigation/stack';
import {connect, ConnectedProps} from 'react-redux';
import {IProfileState} from 'src/store/reducers/profile';
const Stack = createStackNavigator();

const mapState = (state: {profile: IProfileState}) => ({
  userIsLoggedIn: state.profile.userIsLoggedIn,
});

const connector = connect(mapState, null);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = {
  userIsLoggedIn: boolean;
} & PropsFromRedux;

export const RootStack: React.FC<Props> = ({userIsLoggedIn}) => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name={EScreens.ROOT_TABS}
        component={userIsLoggedIn ? RootTabs : AuthStack}
      />
    </Stack.Navigator>
  );
};

export const Root = connector(RootStack);
