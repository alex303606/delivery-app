import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {EScreens, CardStackParamList} from '@interfaces';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CardScreen} from '@screens';

const Stack = createStackNavigator<CardStackParamList>();

export const CardStack: React.FC<BottomTabScreenProps<any>> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={EScreens.CARD_SCREEN}
        component={CardScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
