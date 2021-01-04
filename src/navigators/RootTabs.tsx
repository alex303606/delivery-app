import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {EScreens, RootTabParamList} from '@interfaces';
import {Typography, Icon, IconNames} from '@components';
import {Colors} from '@config';
import {CatalogStack} from '@navigators';
import {useTranslation} from 'react-i18next';
import {UseAppearance} from '@hooks';

type LabelProps = {
  focused: boolean;
  title: string;
};

const {R11, B11} = Typography;
const Tab = createBottomTabNavigator<RootTabParamList>();

const Label: React.FC<LabelProps> = ({focused, title}) => {
  if (focused) {
    return <B11 color={Colors.mainPrimary}>{title}</B11>;
  }
  return <R11 color={Colors.grey}>{title}</R11>;
};

export const RootTabs = () => {
  const {t} = useTranslation();
  const {themeIsLight} = UseAppearance();

  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          height: 60,
          borderTopLeftRadius: themeIsLight ? 12 : 0,
          borderTopRightRadius: themeIsLight ? 12 : 0,
          elevation: 8,
          backgroundColor: themeIsLight ? Colors.white : Colors.black,
        },
        tabStyle: {
          paddingTop: 8,
          paddingBottom: 8,
        },
        inactiveTintColor: Colors.grey,
        activeTintColor: Colors.mainPrimary,
      }}>
      <Tab.Screen
        name={EScreens.CATALOG_STACK}
        component={CatalogStack}
        options={{
          tabBarLabel: ({focused}) => (
            <Label focused={focused} title={t('tabs.catalog')} />
          ),
          tabBarIcon: ({color, focused}) => (
            <Icon
              size={24}
              color={color}
              name={
                focused ? IconNames.catalogActive : IconNames.catalogInactive
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name={EScreens.FAVORITES_STACK}
        component={CatalogStack}
        options={{
          tabBarLabel: ({focused}) => (
            <Label focused={focused} title={t('tabs.favorites')} />
          ),
          tabBarIcon: ({color, focused}) => (
            <Icon
              size={24}
              color={color}
              name={
                focused
                  ? IconNames.favoritesActive
                  : IconNames.favoritesInactive
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name={EScreens.PROFILE_STACK}
        component={CatalogStack}
        options={{
          tabBarLabel: ({focused}) => (
            <Label focused={focused} title={t('tabs.profile')} />
          ),
          tabBarIcon: ({color, focused}) => (
            <Icon
              size={24}
              color={color}
              name={
                focused ? IconNames.profileActive : IconNames.profileInactive
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name={EScreens.CART_STACK}
        component={CatalogStack}
        options={{
          tabBarLabel: ({focused}) => (
            <Label focused={focused} title={t('tabs.basket')} />
          ),
          tabBarIcon: ({color, focused}) => (
            <Icon
              size={24}
              color={color}
              name={focused ? IconNames.basketActive : IconNames.basketInactive}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
