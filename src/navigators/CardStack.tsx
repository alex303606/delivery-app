import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {EScreens, CardStackParamList} from '@interfaces';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CardScreen} from '@screens';
import {CollapsibleHeader} from '@components';
import {Colors} from '@config';
import {useTranslation} from 'react-i18next';
import {useAppearance} from '@hooks';

const Stack = createStackNavigator<CardStackParamList>();

export const CardStack: React.FC<BottomTabScreenProps<any>> = () => {
  const {t} = useTranslation();
  const {themeIsLight} = useAppearance();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={EScreens.CARD_SCREEN}
        component={CardScreen}
        options={{
          title: t('tabs.basket'),
          header: (props) => (
            <CollapsibleHeader showBackButton={false} {...props} />
          ),
          headerTransparent: true,
          headerStyle: {
            backgroundColor: themeIsLight ? Colors.white : Colors.black,
          },
        }}
      />
    </Stack.Navigator>
  );
};
