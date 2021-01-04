import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {EScreens, CatalogStackParamList} from '@interfaces';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CatalogScreen, CatalogItemScreen} from '@screens';
import {Colors} from '@config';
import {useAppearance} from '@hooks';

const Stack = createStackNavigator<CatalogStackParamList>();

export const CatalogStack: React.FC<BottomTabScreenProps<any>> = () => {
  const {themeIsLight} = useAppearance();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={EScreens.CATALOG_SCREEN}
        component={CatalogScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={EScreens.CATALOG_ITEM_SCREEN}
        component={CatalogItemScreen}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: themeIsLight ? Colors.white : Colors.black,
            elevation: 0,
            borderBottomWidth: 0,
          },
        }}
      />
    </Stack.Navigator>
  );
};
