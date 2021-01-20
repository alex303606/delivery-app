import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Block, FavoriteProductCard, Loader, Row, Typography} from '@components';
import {EScreens, OrderScreenProps} from '@interfaces';
import {useTranslation} from 'react-i18next';
import {useAppearance, useLoading} from '@hooks';
import {FlatList} from 'react-native';
import {IProduct} from 'src/store/reducers/favoritest';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getProducts} from '@actions';
import {Colors} from '@config';
import {useNavigation} from '@react-navigation/native';

type Props = {
  getProducts: ({id: []}) => Promise<IProduct[]>;
} & OrderScreenProps;
const keyExtractor = (item: IProduct) => item.ID;

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getProducts,
    },
    dispatch,
  );
};

const connector = connect(null, mapDispatchToProps);

const OrderScreenComponent: React.FC<Props> = (props) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {textColor, backgroundColor} = useAppearance();
  const {loading, hideLoader, showLoader} = useLoading();
  const {
    route: {
      params: {order},
    },
  } = props;

  const [products, setProducts] = useState<IProduct[]>([]);

  const count = order.PRODUCTS.reduce((acc: number, x) => {
    acc += x.COUNT;
    return acc;
  }, 0);

  useEffect(() => {
    showLoader();
    const id = order.PRODUCTS.map((x) => x.ID);
    props.getProducts({id}).then((p) => {
      setProducts(p);
      hideLoader();
    });
  }, [hideLoader, order, props, showLoader]);

  const contentContainerStyle = useMemo(() => {
    return {
      flexGrow: 1,
      paddingHorizontal: 8,
    };
  }, []);

  const onPressHandle = useCallback(
    (item: IProduct) => {
      navigation.navigate(EScreens.PRODUCT_SCREEN, {item});
    },
    [navigation],
  );

  const renderItem = useCallback(({item}: {item: IProduct}) => {
    return <FavoriteProductCard onPress={onPressHandle} item={item} />;
  }, []);

  if (loading) {
    return <Loader background={backgroundColor} color={Colors.white} />;
  }

  return (
    <Block flex={1}>
      <Block padding={16}>
        <Row justifyContent="space-between">
          <Typography.B16 color={textColor}>
            {t('orderNum', {num: order.ID})}
          </Typography.B16>
          <Typography.R14 color={Colors.grey}>
            {order.DATE_CREATE}
          </Typography.R14>
        </Row>
        <Row alignItems="center">
          <Typography.R14 color={Colors.grey}>{t('quantity')}</Typography.R14>
          <Typography.B16 color={textColor}>{count}</Typography.B16>
        </Row>
        <Row justifyContent="space-between">
          <Typography.R14 color={Colors.grey}>{order.CITY}</Typography.R14>
          <Typography.B14 color={'#2AA952'}>
            {t(`orderProcess.${order.STATUS}`)}
          </Typography.B14>
        </Row>
      </Block>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        data={products}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        contentContainerStyle={contentContainerStyle}
      />
    </Block>
  );
};

// @ts-ignore
export const OrderScreen = connector(OrderScreenComponent);
