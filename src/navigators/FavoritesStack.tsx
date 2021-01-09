import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {EScreens, FavoritesStackParamList} from '@interfaces';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {FavoritesScreen, FavoriteScreen} from '@screens';
import {CollapsibleHeader} from '@components';
import {Colors} from '@config';
import {useTranslation} from 'react-i18next';
import {useAppearance} from '@hooks';

const Stack = createStackNavigator<FavoritesStackParamList>();

export const FavoritesStack: React.FC<BottomTabScreenProps<any>> = () => {
  const {t} = useTranslation();
  const {themeIsLight} = useAppearance();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={EScreens.FAVORITES_SCREEN}
        component={FavoritesScreen}
        options={{
          title: t('tabs.favorites'),
          header: (props) => (
            <CollapsibleHeader showBackButton={false} {...props} />
          ),
          headerTransparent: true,
          headerStyle: {
            backgroundColor: themeIsLight ? Colors.white : Colors.black,
          },
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
