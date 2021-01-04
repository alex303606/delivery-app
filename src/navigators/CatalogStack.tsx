import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {EScreens, HomeStackParamList} from '@interfaces';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '@screens';

const Stack = createStackNavigator<HomeStackParamList>();

export const CatalogStack: React.FC<BottomTabScreenProps<any>> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={EScreens.HOME_SCREEN}
        component={HomeScreen}
        initialParams={{sid: 1}}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
