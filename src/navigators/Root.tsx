import React, {useEffect} from 'react';
import {EScreens} from '@interfaces';
import {AuthStack, RootTabs} from '@navigators';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
import {IProfileState} from 'src/store/reducers/profile';
import {bindActionCreators} from 'redux';
import {getSections} from '@actions';
import {RootState} from 'src/store/configureStore';
const Stack = createStackNavigator();

type Props = {
  getSections: () => void;
} & IProfileState;

const mapState = (state: RootState) => ({
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
