import React, {useCallback, useMemo} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {COLLAPSIBLE_HEADER_HEIGHT} from '@config';
import {IOrderItem} from 'src/store/reducers/orders';
import {Order} from './Order';

const keyExtractor = (item: IOrderItem) => item.ID;

type Props = {
  loading: boolean;
  reload: () => void;
  orders: IOrderItem[];
};

export const OrdersList: React.FC<Props> = ({loading, reload, orders}) => {
  const renderItem = useCallback(({item}: {item: IOrderItem}) => {
    return <Order item={item} />;
  }, []);

  const contentContainerStyle = useMemo(() => {
    return {
      flexGrow: 1,
      paddingHorizontal: 8,
    };
  }, []);

  return (
    <FlatList
      progressViewOffset={COLLAPSIBLE_HEADER_HEIGHT}
      showsVerticalScrollIndicator={false}
      keyExtractor={keyExtractor}
      data={orders}
      renderItem={renderItem}
      contentContainerStyle={contentContainerStyle}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={reload} />
      }
    />
  );
};
