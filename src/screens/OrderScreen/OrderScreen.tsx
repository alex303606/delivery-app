import React, {useCallback, useMemo} from 'react';
import {Block, FavoriteProductCard, Typography} from '@components';
import {OrderScreenProps} from '@interfaces';
import {useTranslation} from 'react-i18next';
import {useAppearance} from '@hooks';
import {FlatList} from 'react-native';
import {IProduct} from 'src/store/reducers/favoritest';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

type Props = {} & OrderScreenProps;
const keyExtractor = (item: IProduct) => item.ID;

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({}, dispatch);
};

const connector = connect(mapDispatchToProps);

const OrderScreenComponent: React.FC<Props> = (props) => {
  const {t} = useTranslation();
  const {textColor} = useAppearance();

  const {
    route: {
      params: {order},
    },
  } = props;

  const contentContainerStyle = useMemo(() => {
    return {
      flexGrow: 1,
      paddingHorizontal: 8,
    };
  }, []);

  const renderItem = useCallback(({item}: {item: IProduct}) => {
    return <FavoriteProductCard item={item} />;
  }, []);

  return (
    <Block flex={1} padding={16}>
      <Typography.B16 color={textColor}>
        {t('orderNum', {num: order.ID})}
      </Typography.B16>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        data={[]}
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

export const OrderScreen = connector(OrderScreenComponent);
