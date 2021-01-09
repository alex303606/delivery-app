import React, {useCallback} from 'react';
import {Block, Typography} from '@components';
import {useAppearance} from '@hooks';
import {STATUSBAR_HEIGHT} from '@config';
import {useTranslation} from 'react-i18next';
import {RootState} from 'src/store/configureStore';
import {connect} from 'react-redux';
import {FlatList} from 'react-native';
import {IProduct} from 'src/store/reducers/favoritest';
import {ProductCard} from './ProductCard';
import {bindActionCreators} from 'redux';
import {deleteFavorite} from '@actions';
import {useNavigation} from '@react-navigation/native';
import {EScreens} from '@interfaces';

type Props = {
  deleteFavorite: (id: string) => void;
} & RootState;

const mapState = (state: RootState) => ({
  favorites: state.favorites.favorites,
});

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      deleteFavorite,
    },
    dispatch,
  );
};

const connector = connect(mapState, mapDispatchToProps);
const keyExtractor = (item: IProduct) => item.ID;

export const FavoritesScreenComponent: React.FC<Props> = (props) => {
  const {textColor} = useAppearance();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const onPressHandle = useCallback(
    (item: IProduct) => {
      navigation.navigate(EScreens.FAVORITE_SCREEN, {item});
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({item}: {item: IProduct}) => {
      return (
        <ProductCard
          onDelete={props.deleteFavorite}
          onPress={onPressHandle}
          item={item}
        />
      );
    },
    [onPressHandle, props],
  );

  return (
    <Block flex={1} paddingTop={STATUSBAR_HEIGHT + 40} padding={8}>
      <Typography.B34 marginBottom={24} paddingHorizontal={8} color={textColor}>
        {t('tabs.favorites')}
      </Typography.B34>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        data={props.favorites}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      />
    </Block>
  );
};

export const FavoritesScreen = connector(FavoritesScreenComponent);
