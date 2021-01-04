import React, {useEffect} from 'react';
import {EScreens} from '@interfaces';
import {AuthStack, RootTabs} from '@navigators';
import {createStackNavigator} from '@react-navigation/stack';
import {connect, ConnectedProps} from 'react-redux';
import {IProfileState} from 'src/store/reducers/profile';
import {bindActionCreators} from 'redux';
import {getSections} from '@actions';
const Stack = createStackNavigator();

const mapState = (state: {profile: IProfileState}) => ({
  userIsLoggedIn: state.profile.userIsLoggedIn,
});

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getSections,
    },
    dispatch,
  );
};

const connector = connect(mapState, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = {
  userIsLoggedIn: boolean;
  getSections: () => void;
} & PropsFromRedux;

export const RootStack: React.FC<Props> = (props) => {
  useEffect(() => {
    if (props.userIsLoggedIn) {
      props.getSections();
    }
  }, [props]);
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name={EScreens.ROOT_TABS}
        component={props.userIsLoggedIn ? RootTabs : AuthStack}
      />
    </Stack.Navigator>
  );
};

export const Root = connector(RootStack);
