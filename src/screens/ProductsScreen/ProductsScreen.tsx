import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Block} from '@components';
import {ProductsScreenProps} from '@interfaces';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getProducts} from '@actions';
import {IProduct} from 'src/store/reducers/favoritest';
import {LayoutChangeEvent} from 'react-native';
import {useLoading} from '@hooks';
import {ProductsList} from './ProductsList';
import {SCREEN_HEIGHT} from '@config';

type Props = {
  getProducts: ({
    sectionId,
    pageNum,
  }: {
    sectionId: string[];
    pageNum?: number;
  }) => Promise<IProduct[]>;
} & ProductsScreenProps;

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getProducts,
    },
    dispatch,
  );
};

const connector = connect(null, mapDispatchToProps);

export const ProductsScreenComponent: React.FC<Props> = (props) => {
  const {
    route: {
      params: {item},
    },
  } = props;
  const {loading, showLoader, hideLoader} = useLoading();
  const [products, setProducts] = useState<IProduct[]>([]);
  const layoutHeight = useRef<number>(SCREEN_HEIGHT);
  const pageNum = useRef<number>(2);
  const canFetchMore = useRef<boolean>(true);
  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => {
      layoutHeight.current = e.nativeEvent.layout.height;
    },
    [layoutHeight],
  );

  const onRefresh = useCallback(() => {
    showLoader();
    props.getProducts({sectionId: [item.ID]}).then((res) => {
      setProducts(res);
      canFetchMore.current = true;
      pageNum.current = 2;
      hideLoader();
    });
  }, [hideLoader, item.ID, props, showLoader]);

  const handleEndReached = () => {
    if (!canFetchMore || loading) {
      return;
    }
    showLoader();
    props
      .getProducts({sectionId: [item.ID], pageNum: pageNum.current})
      .then((res) => {
        const arr = [...products, ...res];
        setProducts(arr);
        pageNum.current = pageNum.current + 1;
        canFetchMore.current = !!res.length;
        hideLoader();
      });
  };

  useEffect(onRefresh, [item.ID]);

  return (
    <Block flex={1} onLayout={handleLayout}>
      <ProductsList
        onRefresh={onRefresh}
        products={products}
        onEndReached={handleEndReached}
        layoutHeight={layoutHeight.current}
        loading={loading}
      />
    </Block>
  );
};

// @ts-ignore
export const ProductsScreen = connector(ProductsScreenComponent);
