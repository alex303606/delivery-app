import React, {useCallback, useMemo} from 'react';
import {Block, ListEmptyComponent, Typography} from '@components';
import {useAppearance, useLoading} from '@hooks';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {RootState} from 'src/store/configureStore';
import {EScreens} from '@interfaces';
import {COLLAPSIBLE_HEADER_HEIGHT} from '@config';
import {FlatList, RefreshControl} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {IOrderItem} from 'src/store/reducers/orders';
import {getOrders} from '@actions';
import {Order} from './Order';
type Props = {
  getOrders: () => Promise<void>;
} & RootState;

const keyExtractor = (item: IOrderItem) => item.ID;

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getOrders,
    },
    dispatch,
  );
};

const mapState = (state: RootState) => ({
  orders: state.orders.orders,
});

const connector = connect(mapState, mapDispatchToProps);

const OrdersScreenComponent: React.FC<Props> = (props) => {
  const {textColor} = useAppearance();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {loading, showLoader, hideLoader} = useLoading();

  const reload = useCallback(() => {
    showLoader();
    props.getOrders().then(() => {
      hideLoader();
    });
  }, [hideLoader, props, showLoader]);

  const contentContainerStyle = useMemo(() => {
    return {
      flexGrow: 1,
      paddingHorizontal: 8,
    };
  }, []);

  const renderItem = useCallback(({item}: {item: IOrderItem}) => {
    return <Order item={item} />;
  }, []);

  return (
    <Block flex={1} paddingTop={16}>
      <Typography.B34
        paddingHorizontal={16}
        marginBottom={20}
        color={textColor}>
        {t('orders')}
      </Typography.B34>
      <FlatList
        ListEmptyComponent={
          <ListEmptyComponent
            title={t('ordersIsEmpty')}
            buttonTitle={t('goToMenu')}
            onPress={() => navigation.navigate(EScreens.CATALOG_STACK)}
          />
        }
        progressViewOffset={COLLAPSIBLE_HEADER_HEIGHT}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        data={props.orders}
        renderItem={renderItem}
        contentContainerStyle={contentContainerStyle}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={reload} />
        }
      />
    </Block>
  );
};

// @ts-ignore
export const OrdersScreen = connector(OrdersScreenComponent);
