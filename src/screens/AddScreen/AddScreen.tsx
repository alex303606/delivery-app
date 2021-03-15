import React, {useCallback, useMemo} from 'react';
import {Block, FocusAwareStatusBar, AuctionCard} from '@components';
import {useScrollHandler, useSetScreenOptions} from '@hooks';
import {COLLAPSIBLE_HEADER_HEIGHT, Colors} from '@config';
import {useTranslation} from 'react-i18next';
import {EScreens} from '@interfaces';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootState} from 'src/store/configureStore';
import {connect} from 'react-redux';
import {ICardState, IProduct} from 'src/store/reducers/card';
import Animated from 'react-native-reanimated';
import {bindActionCreators} from 'redux';
import {addToCard, decrementProduct, deleteFromCard} from '@actions';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

type Props = {
  deleteFromCard: (id: string) => void;
  addToCard: (item: IProduct) => void;
  decrementProduct: (item: IProduct) => void;
} & ICardState;
const keyExtractor = (item: IProduct) => item.ID;
const mapState = (state: RootState) => ({
  productsInCard: state.card.productsInCard,
});

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      deleteFromCard,
      addToCard,
      decrementProduct,
    },
    dispatch,
  );
};

const connector = connect(mapState, mapDispatchToProps);

const AddScreenComponent: React.FC<Props> = (props) => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const {scrollY, onScroll} = useScrollHandler();
  useSetScreenOptions(
    {
      animatedValue: scrollY,
    },
    [scrollY],
  );

  const contentContainerStyle = useMemo(() => {
    return {
      flexGrow: 1,
      paddingTop: COLLAPSIBLE_HEADER_HEIGHT + 8,
      paddingHorizontal: 8,
    };
  }, []);

  const renderItem = useCallback(
    ({item}: {item: IProduct}) => {
      return <AuctionCard item={item} />;
    },
    [props.deleteFromCard],
  );

  const count: number = props.productsInCard.reduce((acc, x) => {
    if (x.count) {
      acc = acc + x.count;
    }
    return acc;
  }, 0);

  return (
    <Block flex={1}>
      <FocusAwareStatusBar
        animated={true}
        backgroundColor={Colors.transparent}
        barStyle="light-content"
      />
    </Block>
  );
};

export const AddScreen = connector(AddScreenComponent);
