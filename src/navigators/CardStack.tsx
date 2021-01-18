import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {EScreens, CardStackParamList} from '@interfaces';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CardScreen} from '@screens';
import {CollapsibleHeader} from '@components';
import {Colors} from '@config';
import {useTranslation} from 'react-i18next';
import {useAppearance} from '@hooks';
import {bindActionCreators} from 'redux';
import {clearCard} from '@actions';
import {connect} from 'react-redux';
import {RootState} from 'src/store/configureStore';
import {ICardState} from 'src/store/reducers/card';

const Stack = createStackNavigator<CardStackParamList>();

type Props = {
  clearCard: () => void;
} & BottomTabScreenProps<any> &
  ICardState;

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      clearCard,
    },
    dispatch,
  );
};

const mapState = (state: RootState) => ({
  productsInCard: state.card.productsInCard,
});

const connector = connect(mapState, mapDispatchToProps);

const CardStackComponent: React.FC<Props> = (propsStack) => {
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
            <CollapsibleHeader
              iconName="trash-outline"
              onPress={propsStack.clearCard}
              showBackButton={propsStack.productsInCard.length > 0}
              {...props}
            />
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

export const CardStack = connector(CardStackComponent);
