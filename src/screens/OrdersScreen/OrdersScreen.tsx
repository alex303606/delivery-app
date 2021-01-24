import React, {useCallback, useEffect, useState} from 'react';
import {Block, ListEmptyComponent, Typography} from '@components';
import {useAppearance, useLoading} from '@hooks';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {RootState} from 'src/store/configureStore';
import {EScreens} from '@interfaces';
import {useNavigation} from '@react-navigation/native';
import {IOrderItem, IOrdersState} from 'src/store/reducers/orders';
import {getOrders} from '@actions';
import {Filter} from './Filter';
import {OrdersList} from './OrdersList';

type Props = {
  getOrders: () => Promise<void>;
} & IOrdersState;

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
  const [filter, setFilter] = useState<string>('N');
  const [orders, setOrders] = useState<IOrderItem[]>([]);

  useEffect(() => {
    setOrders(
      props.orders.filter((x: IOrderItem) => {
        if (filter === 'N') {
          return x.STATUS === 'N';
        }
        return x.STATUS !== 'N';
      }),
    );
  }, [filter, props.orders]);

  const reload = useCallback(() => {
    showLoader();
    props.getOrders().then(() => {
      hideLoader();
    });
  }, [hideLoader, props, showLoader]);

  return (
    <Block flex={1} paddingTop={16}>
      <Typography.B34 paddingHorizontal={16} color={textColor}>
        {t('orders')}
      </Typography.B34>
      {props.orders.length === 0 ? (
        <ListEmptyComponent
          title={t('ordersIsEmpty')}
          buttonTitle={t('goToMenu')}
          onPress={() => navigation.navigate(EScreens.CATALOG_STACK)}
        />
      ) : (
        <>
          <Filter setFilter={setFilter} filter={filter} />
          <OrdersList loading={loading} reload={reload} orders={orders} />
        </>
      )}
    </Block>
  );
};

// @ts-ignore
export const OrdersScreen = connector(OrdersScreenComponent);
