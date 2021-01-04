import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {EScreens, ProfileStackParamList} from '@interfaces';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {ProfileScreen} from '@screens';

const Stack = createStackNavigator<ProfileStackParamList>();

export const ProfileStack: React.FC<BottomTabScreenProps<any>> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={EScreens.PROFILE_SCREEN}
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
