import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {EScreens, AuthStackParamList} from '@interfaces';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {LoginScreen, SmsCodeScreen} from '@screens';
import {UseAppearance} from '@hooks';

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthStack: React.FC<BottomTabScreenProps<any>> = () => {
  const {backgroundColor} = UseAppearance();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={EScreens.LOGIN_SCREEN}
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={EScreens.SMS_CODE_SCREEN}
        component={SmsCodeScreen}
        options={{
          headerShown: true,
          title: '',
          headerStyle: {
            backgroundColor: backgroundColor,
            elevation: 0,
            shadowColor: 'transparent',
            borderBottomWidth: 0,
          },
        }}
      />
    </Stack.Navigator>
  );
};
