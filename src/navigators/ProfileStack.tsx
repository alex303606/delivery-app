import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {EScreens, ProfileStackParamList} from '@interfaces';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  OrdersScreen,
  ProfileScreen,
  SettingsScreen,
  PersonalDataScreen,
} from '@screens';
import {useAppearance} from '@hooks';
import {Colors} from '@config';

const Stack = createStackNavigator<ProfileStackParamList>();

export const ProfileStack: React.FC<BottomTabScreenProps<any>> = () => {
  const {themeIsLight} = useAppearance();

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
            backgroundColor: themeIsLight ? Colors.background : Colors.black,
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
            backgroundColor: themeIsLight ? Colors.background : Colors.black,
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
            backgroundColor: themeIsLight ? Colors.background : Colors.black,
            elevation: 0,
            borderBottomWidth: 0,
          },
        }}
      />
    </Stack.Navigator>
  );
};
