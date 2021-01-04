import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {EScreens, FavoritesStackParamList} from '@interfaces';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {FavoritesScreen} from '@screens';

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
    </Stack.Navigator>
  );
};
