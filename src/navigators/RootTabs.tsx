import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {EScreens, RootTabParamList} from '@interfaces';
import {Typography, Icon, IconNames} from '@components';
import {Colors} from '@config';
import {HomeStack} from './HomeStack';
import {useTranslation} from 'react-i18next';

type LabelProps = {
  focused: boolean;
  title: string;
};

const {R11, B11} = Typography;
const Tab = createBottomTabNavigator<RootTabParamList>();

const Label: React.FC<LabelProps> = ({focused, title}) => {
  if (focused) {
    return <B11 color={Colors.black}>{title}</B11>;
  }
  return <R11 color={Colors.grey}>{title}</R11>;
};

export const RootTabs = () => {
  const {t} = useTranslation();

  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          height: 57,
          borderTopWidth: 1,
          borderTopColor: Colors.black,
        },
        tabStyle: {
          paddingTop: 11,
          paddingBottom: 4,
        },
        inactiveTintColor: Colors.grey,
        activeTintColor: Colors.mainPrimary,
      }}>
      <Tab.Screen
        name={EScreens.HOME_STACK}
        component={HomeStack}
        options={{
          tabBarLabel: ({focused}) => (
            <Label focused={focused} title={t('tabs.main')} />
          ),
          tabBarIcon: ({color}) => (
            <Icon size={24} color={color} name={IconNames.home} />
          ),
        }}
      />
      <Tab.Screen
        name={EScreens.MENU_STACK}
        component={HomeStack}
        options={{
          tabBarLabel: ({focused}) => (
            <Label focused={focused} title={t('tabs.menu')} />
          ),
          tabBarIcon: ({color}) => (
            <Icon size={24} color={color} name={IconNames.menu} />
          ),
        }}
      />
      <Tab.Screen
        name={EScreens.PROFILE_STACK}
        component={HomeStack}
        options={{
          tabBarLabel: ({focused}) => (
            <Label focused={focused} title={t('tabs.profile')} />
          ),
          tabBarIcon: ({color}) => (
            <Icon size={24} color={color} name={IconNames.profile} />
          ),
        }}
      />
      <Tab.Screen
        name={EScreens.CART_STACK}
        component={HomeStack}
        options={{
          tabBarLabel: ({focused}) => (
            <Label focused={focused} title={t('tabs.basket')} />
          ),
          tabBarIcon: ({color}) => (
            <Icon size={24} color={color} name={IconNames.basket} />
          ),
        }}
      />
      <Tab.Screen
        name={EScreens.SEARCH_STACK}
        component={HomeStack}
        options={{
          tabBarLabel: ({focused}) => (
            <Label focused={focused} title={t('tabs.search')} />
          ),
          tabBarIcon: ({color}) => (
            <Icon size={24} color={color} name={IconNames.search} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
