import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {EScreens, FavoritesStackParamList} from '@interfaces';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {FavoritesScreen, FavoriteScreen} from '@screens';

const Stack = createStackNavigator<FavoritesStackParamList>();

export const FavoritesStack: React.FC<BottomTabScreenProps<any>> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={EScreens.FAVORITES_SCREEN}
        component={FavoritesScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={EScreens.FAVORITE_SCREEN}
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
