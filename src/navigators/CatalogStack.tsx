import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {EScreens, CatalogStackParamList} from '@interfaces';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CatalogScreen,
  CatalogItemScreen,
  ProductsScreen,
  FavoriteScreen,
} from '@screens';
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
        options={({route, navigation}) => {
          const {
            params: {parentItem},
          } = route;
          return {
            title: parentItem.NAME,
            header: (props) => (
              <CollapsibleHeader onPress={navigation.goBack} {...props} />
            ),
            headerTransparent: true,
            headerStyle: {
              backgroundColor: themeIsLight ? Colors.white : Colors.black,
            },
          };
        }}
      />
      <Stack.Screen
        name={EScreens.PRODUCTS_SCREEN}
        component={ProductsScreen}
        options={({route}) => {
          const {
            params: {item},
          } = route;
          return {
            title: item.NAME || '',
            headerTitleAlign: 'center',
            headerStyle: {
              elevation: 0,
              borderBottomWidth: 0,
            },
          };
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
