import React, {useCallback, useMemo} from 'react';
import {Block, FocusAwareStatusBar} from '@components';
import {
  useAppearance,
  useLoading,
  useScrollHandler,
  useSetScreenOptions,
} from '@hooks';
import {COLLAPSIBLE_HEADER_HEIGHT, Colors} from '@config';
import {RootState} from 'src/store/configureStore';
import {connect} from 'react-redux';
import {FlatList, RefreshControl} from 'react-native';
import {IProduct} from 'src/store/reducers/favoritest';
import {ProductCard} from './ProductCard';
import {bindActionCreators} from 'redux';
import {deleteFavorite, getFavorites} from '@actions';
import {useNavigation} from '@react-navigation/native';
import {EScreens} from '@interfaces';
import Animated from 'react-native-reanimated';

type Props = {
  deleteFavorite: (id: string) => void;
  getFavorites: () => Promise<any>;
} & RootState;

const mapState = (state: RootState) => ({
  favorites: state.favorites.favorites,
});

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      deleteFavorite,
      getFavorites,
    },
    dispatch,
  );
};

const connector = connect(mapState, mapDispatchToProps);
const keyExtractor = (item: IProduct) => item.ID;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const FavoritesScreenComponent: React.FC<Props> = (props) => {
  const navigation = useNavigation();
  const {loading, showLoader, hideLoader} = useLoading();
  const {themeIsLight} = useAppearance();

  const reload = useCallback(() => {
    showLoader();
    props.getFavorites().then(() => {
      hideLoader();
    });
  }, [hideLoader, props, showLoader]);

  const onPressHandle = useCallback(
    (item: IProduct) => {
      navigation.navigate(EScreens.FAVORITE_SCREEN, {item});
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({item}: {item: IProduct}) => {
      return (
        <ProductCard
          onDelete={props.deleteFavorite}
          onPress={onPressHandle}
          item={item}
        />
      );
    },
    [onPressHandle, props],
  );

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

  return (
    <Block flex={1}>
      <FocusAwareStatusBar
        animated={true}
        backgroundColor={themeIsLight ? Colors.white : Colors.black}
      />
      <AnimatedFlatList
        progressViewOffset={COLLAPSIBLE_HEADER_HEIGHT}
        onScroll={onScroll}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        data={props.favorites}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        contentContainerStyle={contentContainerStyle}
        refreshControl={
          <RefreshControl
            progressViewOffset={COLLAPSIBLE_HEADER_HEIGHT}
            refreshing={loading}
            onRefresh={reload}
          />
        }
      />
    </Block>
  );
};

// @ts-ignore
export const FavoritesScreen = connector(FavoritesScreenComponent);
