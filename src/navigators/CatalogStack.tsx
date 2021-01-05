import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {EScreens, CatalogStackParamList} from '@interfaces';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CatalogScreen, CatalogItemScreen} from '@screens';
import {CollapsibleHeader, MainCollapsibleHeader} from '@components';
import {useAppearance} from '@hooks';
import {Colors} from '@config';

const Stack = createStackNavigator<CatalogStackParamList>();

export const CatalogStack: React.FC<BottomTabScreenProps<any>> = () => {
  const {themeIsLight} = useAppearance();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={EScreens.CATALOG_SCREEN}
        component={CatalogScreen}
        options={{
          header: (props) => <MainCollapsibleHeader {...props} />,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name={EScreens.CATALOG_ITEM_SCREEN}
        component={CatalogItemScreen}
        options={({route}) => {
          const {
            params: {parentItem},
          } = route;
          return {
            title: parentItem.NAME,
            header: (props) => <CollapsibleHeader {...props} />,
            headerTransparent: true,
            headerStyle: {
              backgroundColor: themeIsLight ? Colors.white : Colors.black,
            },
          };
        }}
      />
    </Stack.Navigator>
  );
};
