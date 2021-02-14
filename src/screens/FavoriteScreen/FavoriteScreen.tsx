import React from 'react';
import {Block} from '@components';
import {FavoriteScreenProps} from '@interfaces';
import {ProductFullScreenCard} from '@components';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {RootState} from 'src/store/configureStore';
import {ICardState} from 'src/store/reducers/card';
import {addToCard, addToFavorite, deleteFavorite} from '@actions';
import {IFavoritesState} from 'src/store/reducers/favoritest';

type Props = {
  addToCard: () => void;
  addToFavorite: (id: string) => void;
  deleteFavorite: (id: string) => void;
} & FavoriteScreenProps &
  ICardState &
  IFavoritesState;

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      addToCard,
      addToFavorite,
      deleteFavorite,
    },
    dispatch,
  );
};

const mapState = (state: RootState) => ({
  favorites: state.favorites.favorites,
  productsInCard: state.card.productsInCard,
});

const connector = connect(mapState, mapDispatchToProps);

export const FavoriteScreenComponent: React.FC<Props> = (props) => {
  const {
    route: {
      params: {item},
    },
  } = props;
  const product = props.productsInCard.find((x) => x.ID === item.ID);
  const isLiked = !!props.favorites.find((x) => x.ID === item.ID);
  return (
    <Block flex={1}>
      <ProductFullScreenCard
        isLiked={isLiked}
        addToFavorite={props.addToFavorite}
        deleteFavorite={props.deleteFavorite}
        zoom={true}
        count={product?.count || 0}
        isAddedToCard={!!product}
        addToCard={props.addToCard}
        item={item}
      />
    </Block>
  );
};

// @ts-ignore
export const FavoriteScreen = connector(FavoriteScreenComponent);
