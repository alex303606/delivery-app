import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {EScreens, AuthStackParamList} from '@interfaces';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {LoginScreen} from '@screens';

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthStack: React.FC<BottomTabScreenProps<any>> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={EScreens.LOGIN_SCREEN}
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
