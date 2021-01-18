import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import {IProduct} from 'src/store/reducers/favoritest';
import {ProductFullScreenCard, ListEmptyComponent} from '@components';
import {useTranslation} from 'react-i18next';
import {ICardState} from 'src/store/reducers/card';

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
  const renderItem = useCallback(
    ({item}: {item: IProduct}) => {
      const isLiked = !!favorites.find((x) => x.ID === item.ID);
      const product = productsInCard.find((x) => x.ID === item.ID);
      return (
        <ProductFullScreenCard
          count={product?.count || 0}
          isAddedToCard={!!product}
          addToCard={addToCard}
          isLiked={isLiked}
          addToFavorite={addToFavorite}
          deleteFavorite={deleteFavorite}
          layoutHeight={layoutHeight}
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

  const getItemLayout = (_: any, index: number) => ({
    index,
    length: layoutHeight,
    offset: index * layoutHeight,
  });

  return (
    <FlatList
      ListEmptyComponent={<ListEmptyComponent title={t('soon')} />}
      initialNumToRender={1}
      getItemLayout={getItemLayout}
      keyExtractor={keyExtractor}
      refreshing={loading}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      disableIntervalMomentum={true}
      decelerationRate="normal"
      snapToInterval={layoutHeight}
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}
      data={products}
      renderItem={renderItem}
    />
  );
};
