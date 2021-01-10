import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import {IProduct} from 'src/store/reducers/favoritest';
import {ProductFullScreenCard, ListEmptyComponent} from '@components';
import {useTranslation} from 'react-i18next';

type Props = {
  products: IProduct[];
  loading: boolean;
  onEndReached: () => void;
  onRefresh: () => void;
  layoutHeight: number;
};

const keyExtractor = (item: IProduct) => item.ID;

export const ProductsList: React.FC<Props> = ({
  products,
  loading,
  onRefresh,
  onEndReached,
  layoutHeight,
}) => {
  const {t} = useTranslation();
  const renderItem = useCallback(
    ({item}: {item: IProduct}) => {
      return <ProductFullScreenCard layoutHeight={layoutHeight} item={item} />;
    },
    [layoutHeight],
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
