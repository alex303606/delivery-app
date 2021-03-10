import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {EScreens, RootTabParamList} from '@interfaces';
import {Typography, Icon, IconNames, Block} from '@components';
import {Colors, TAB_BAR_HEIGHT} from '@config';
import {
  CatalogStack,
  ProfileStack,
  CardStack,
  FavoritesStack,
} from '@navigators';
import {useTranslation} from 'react-i18next';
import {useAppearance} from '@hooks';
import styled from 'styled-components';
import {RootState} from 'src/store/configureStore';
import {connect} from 'react-redux';
import {ICardState} from 'src/store/reducers/card';

type LabelProps = {
  focused: boolean;
  title: string;
};

const mapState = (state: RootState) => ({
  productsInCard: state.card.productsInCard,
});

const connector = connect(mapState, null);

const {R11, B11} = Typography;
const Tab = createBottomTabNavigator<RootTabParamList>();

const Label: React.FC<LabelProps> = ({focused, title}) => {
  if (focused) {
    return <B11 color={Colors.mainPrimary}>{title}</B11>;
  }
  return <R11 color={Colors.grey}>{title}</R11>;
};

const RootTabsComponent: React.FC<ICardState> = (props) => {
  const {t} = useTranslation();
  const {themeIsLight} = useAppearance();
  const count: number = props.productsInCard.reduce((acc, x) => {
    if (x.count) {
      acc = acc + x.count;
    }
    return acc;
  }, 0);

  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          height: TAB_BAR_HEIGHT,
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
        keyboardHidesTabBar: true,
      }}>
      <Tab.Screen
        name={EScreens.CATALOG_STACK}
        component={CatalogStack}
        options={{
          tabBarLabel: ({focused}) => (
            <Label focused={focused} title={t('tabs.search')} />
          ),
          tabBarIcon: ({color, focused}) => (
            <Icon
              size={24}
              color={color}
              name={focused ? IconNames.searchActive : IconNames.searchInactive}
            />
          ),
        }}
      />
      <Tab.Screen
        name={EScreens.FAVORITES_STACK}
        component={FavoritesStack}
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
        name={EScreens.CART_STACK}
        component={CardStack}
        options={{
          tabBarLabel: ({focused}) => (
            <Label focused={focused} title={t('tabs.add')} />
          ),
          tabBarIcon: ({color, focused}) => (
            <Block>
              <Icon
                size={24}
                color={color}
                name={focused ? IconNames.addActive : IconNames.addInactive}
              />
              {count > 0 && (
                <Count backgroundColor={color}>
                  <Typography.B11 numberOfLines={1} color={Colors.white}>
                    {count}
                  </Typography.B11>
                </Count>
              )}
            </Block>
          ),
        }}
      />
      <Tab.Screen
        name={EScreens.ADD_STACK}
        component={CardStack}
        options={{
          tabBarLabel: ({focused}) => (
            <Label focused={focused} title={t('tabs.chat')} />
          ),
          tabBarIcon: ({color, focused}) => (
            <Block>
              <Icon
                size={24}
                color={color}
                name={focused ? IconNames.chatActive : IconNames.chatInactive}
              />
              {count > 0 && (
                <Count backgroundColor={color}>
                  <Typography.B11 numberOfLines={1} color={Colors.white}>
                    {count}
                  </Typography.B11>
                </Count>
              )}
            </Block>
          ),
        }}
      />
      <Tab.Screen
        name={EScreens.PROFILE_STACK}
        component={ProfileStack}
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
    </Tab.Navigator>
  );
};

export const RootTabs = connector(RootTabsComponent);

const Count = styled(Block)`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -5px;
  right: -12px;
  overflow: hidden;
`;
