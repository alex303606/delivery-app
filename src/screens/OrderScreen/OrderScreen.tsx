import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Block, FavoriteProductCard, Loader, Typography} from '@components';
import {OrderScreenProps} from '@interfaces';
import {useTranslation} from 'react-i18next';
import {useAppearance, useLoading} from '@hooks';
import {FlatList} from 'react-native';
import {IProduct} from 'src/store/reducers/favoritest';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getProducts} from '@actions';
import {Colors} from '@config';

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
  const {textColor, backgroundColor} = useAppearance();
  const {loading, hideLoader, showLoader} = useLoading();
  const {
    route: {
      params: {order},
    },
  } = props;

  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    showLoader();
    const id = order.PRODUCTS.map((x) => x.ID);
    props.getProducts({id}).then((p) => {
      setProducts(p);
      hideLoader();
    });
  }, [order, props]);

  const contentContainerStyle = useMemo(() => {
    return {
      flexGrow: 1,
      paddingHorizontal: 8,
    };
  }, []);

  const renderItem = useCallback(({item}: {item: IProduct}) => {
    return <FavoriteProductCard item={item} />;
  }, []);

  if (loading) {
    return <Loader background={backgroundColor} color={Colors.white} />;
  }

  return (
    <Block flex={1} padding={16}>
      <Typography.B16 color={textColor}>
        {t('orderNum', {num: order.ID})}
      </Typography.B16>
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
