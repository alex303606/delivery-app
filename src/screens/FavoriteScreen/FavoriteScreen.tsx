import React from 'react';
import {Block} from '@components';
import {FavoriteScreenProps} from '@interfaces';
import {ProductFullScreenCard} from '@components';

type Props = {} & FavoriteScreenProps;

export const FavoriteScreen: React.FC<Props> = (props) => {
  const {
    route: {
      params: {item},
    },
  } = props;
  return (
    <Block flex={1}>
      <ProductFullScreenCard item={item} />
    </Block>
  );
};
