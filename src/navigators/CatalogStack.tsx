import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {EScreens, CatalogStackParamList} from '@interfaces';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CatalogScreen} from '@screens';

const Stack = createStackNavigator<CatalogStackParamList>();

export const CatalogStack: React.FC<BottomTabScreenProps<any>> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={EScreens.CATALOG_SCREEN}
        component={CatalogScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};