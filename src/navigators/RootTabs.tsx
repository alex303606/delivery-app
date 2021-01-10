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
import {IFavoritesState} from 'src/store/reducers/favoritest';

type LabelProps = {
  focused: boolean;
  title: string;
};

const mapState = (state: RootState) => ({
  favorites: state.favorites.favorites,
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

const RootTabsComponent: React.FC<IFavoritesState> = (props) => {
  const {t} = useTranslation();
  const {themeIsLight} = useAppearance();

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
      <Tab.Screen
        name={EScreens.CART_STACK}
        component={CardStack}
        options={{
          tabBarLabel: ({focused}) => (
            <Label focused={focused} title={t('tabs.basket')} />
          ),
          tabBarIcon: ({color, focused}) => (
            <Block>
              <Icon
                size={24}
                color={color}
                name={
                  focused ? IconNames.basketActive : IconNames.basketInactive
                }
              />
              {!!props.favorites.length && (
                <Count backgroundColor={color}>
                  <Typography.B11 numberOfLines={1} color={Colors.white}>
                    {props.favorites.length}
                  </Typography.B11>
                </Count>
              )}
            </Block>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// @ts-ignore
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
