import React, {useCallback, useMemo} from 'react';
import {Block, ListEmptyComponent} from '@components';
import {useScrollHandler, useSetScreenOptions} from '@hooks';
import {COLLAPSIBLE_HEADER_HEIGHT} from '@config';
import {useTranslation} from 'react-i18next';
import {EScreens} from '@interfaces';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootState} from 'src/store/configureStore';
import {connect} from 'react-redux';
import {ICardState} from 'src/store/reducers/card';
import {IProduct} from 'src/store/reducers/favoritest';
import {ProductCard} from './ProductCard';
import Animated from 'react-native-reanimated';
import {bindActionCreators} from 'redux';
import {deleteFromCard} from '@actions';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

type Props = {
  deleteFromCard: (id: string) => void;
} & ICardState;
const keyExtractor = (item: IProduct) => item.ID;
const mapState = (state: RootState) => ({
  productsInCard: state.card.productsInCard,
});

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      deleteFromCard,
    },
    dispatch,
  );
};

const connector = connect(mapState, mapDispatchToProps);

const CardScreenComponent: React.FC<Props> = (props) => {
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
      return <ProductCard onDelete={props.deleteFromCard} item={item} />;
    },
    [props.deleteFromCard],
  );

  return (
    <Block flex={1}>
      <AnimatedFlatList
        ListEmptyComponent={
          <ListEmptyComponent
            title={t('cardIsEmpty')}
            buttonTitle={t('goToMenu')}
            onPress={() => navigation.navigate(EScreens.CATALOG_STACK)}
          />
        }
        progressViewOffset={COLLAPSIBLE_HEADER_HEIGHT}
        onScroll={onScroll}
        keyExtractor={keyExtractor}
        data={props.productsInCard}
        contentContainerStyle={contentContainerStyle}
        renderItem={renderItem}
      />
    </Block>
  );
};

export const CardScreen = connector(CardScreenComponent);
