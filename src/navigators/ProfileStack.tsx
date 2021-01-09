import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {EScreens, ProfileStackParamList} from '@interfaces';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  OrdersScreen,
  ProfileScreen,
  SettingsScreen,
  PersonalDataScreen,
  AppDataScreen,
} from '@screens';

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
      <Stack.Screen
        name={EScreens.ORDERS_SCREEN}
        component={OrdersScreen}
        options={{
          title: '',
          headerStyle: {
            elevation: 0,
            borderBottomWidth: 0,
          },
        }}
      />
      <Stack.Screen
        name={EScreens.SETTINGS_SCREEN}
        component={SettingsScreen}
        options={{
          title: '',
          headerStyle: {
            elevation: 0,
            borderBottomWidth: 0,
          },
        }}
      />
      <Stack.Screen
        name={EScreens.APP_DATA_SCREEN}
        component={AppDataScreen}
        options={{
          title: '',
          headerStyle: {
            elevation: 0,
            borderBottomWidth: 0,
          },
        }}
      />
      <Stack.Screen
        name={EScreens.PERSONAL_DATA_SCREEN}
        component={PersonalDataScreen}
        initialParams={{newUser: false}}
        options={{
          title: '',
          headerStyle: {
            elevation: 0,
            borderBottomWidth: 0,
          },
        }}
      />
    </Stack.Navigator>
  );
};
