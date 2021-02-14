import React, {useCallback, useMemo} from 'react';
import {FlatList} from 'react-native';
import {IProduct} from 'src/store/reducers/favoritest';
import {ListEmptyComponent, FavoriteProductCard} from '@components';
import {useTranslation} from 'react-i18next';
import {ICardState} from 'src/store/reducers/card';
import {EScreens} from '@interfaces';
import {useNavigation} from '@react-navigation/native';

type Props = {
  addToFavorite: (id: string) => void;
  deleteFavorite: (id: string) => void;
  products: IProduct[];
  loading: boolean;
  onEndReached: () => void;
  onRefresh: () => void;
  layoutHeight: number;
  favorites: IProduct[];
  addToCard: (item: IProduct) => void;
} & ICardState;

const keyExtractor = (item: IProduct) => item.ID;

export const ProductsList: React.FC<Props> = ({
  products,
  loading,
  onRefresh,
  onEndReached,
  layoutHeight,
  addToFavorite,
  deleteFavorite,
  favorites,
  addToCard,
  productsInCard,
}) => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const onPressHandle = useCallback(
    (item: IProduct) => {
      navigation.navigate(EScreens.PRODUCT_SCREEN, {item});
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({item}: {item: IProduct}) => {
      return (
        <FavoriteProductCard
          onPress={onPressHandle}
          addToCard={addToCard}
          item={item}
        />
      );
    },
    [
      favorites,
      productsInCard,
      addToCard,
      addToFavorite,
      deleteFavorite,
      layoutHeight,
    ],
  );

  const contentContainerStyle = useMemo(() => {
    return {
      flexGrow: 1,
      paddingHorizontal: 8,
    };
  }, []);

  return (
    <FlatList
      ListEmptyComponent={<ListEmptyComponent title={t('soon')} />}
      keyExtractor={keyExtractor}
      refreshing={loading}
      onRefresh={onRefresh}
      numColumns={2}
      columnWrapperStyle={{
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      onEndReached={onEndReached}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={false}
      data={products}
      renderItem={renderItem}
    />
  );
};
