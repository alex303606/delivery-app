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

const {Caption, CaptionSemibold} = Typography;
const Tab = createBottomTabNavigator<RootTabParamList>();

const Label: React.FC<LabelProps> = ({focused, title}) => {
  if (focused) {
    return <CaptionSemibold color={Colors.black100}>{title}</CaptionSemibold>;
  }
  return <Caption color={Colors.black200}>{title}</Caption>;
};

export const RootTabs = () => {
  const {t} = useTranslation();

  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          height: 57,
          borderTopWidth: 1,
          borderTopColor: Colors.black400,
        },
        tabStyle: {
          paddingTop: 11,
          paddingBottom: 4,
        },
        inactiveTintColor: Colors.black200,
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
