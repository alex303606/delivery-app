import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {EScreens, ProfileStackParamList} from '@interfaces';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  OrdersScreen,
  ProfileScreen,
  SettingsScreen,
  PersonalDataScreen,
  AppDataScreen,
  OrderScreen,
  FavoriteScreen,
} from '@screens';
import {useTranslation} from 'react-i18next';

const Stack = createStackNavigator<ProfileStackParamList>();

export const ProfileStack: React.FC<BottomTabScreenProps<any>> = () => {
  const {t} = useTranslation();

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
        name={EScreens.ORDER_SCREEN}
        component={OrderScreen}
        options={({route}) => {
          const {
            params: {order},
          } = route;
          return {
            title: t('orderNum', {num: order.ID}),
            ...TransitionPresets.ModalSlideFromBottomIOS,
            headerTitleAlign: 'center',
            headerStyle: {
              elevation: 0,
              borderBottomWidth: 0,
            },
          };
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
      <Stack.Screen
        name={EScreens.PRODUCT_SCREEN}
        component={FavoriteScreen}
        options={({route}) => {
          const {
            params: {item},
          } = route;
          return {
            title: item.NAME,
            ...TransitionPresets.ModalSlideFromBottomIOS,
            headerTitleAlign: 'center',
            headerStyle: {
              elevation: 0,
              borderBottomWidth: 0,
            },
          };
        }}
      />
    </Stack.Navigator>
  );
};
