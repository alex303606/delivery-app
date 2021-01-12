import React, {useCallback, useMemo} from 'react';
import {Block, ListEmptyComponent, Typography} from '@components';
import {useAppearance} from '@hooks';
import {STATUSBAR_HEIGHT} from '@config';
import {useTranslation} from 'react-i18next';
import {EScreens} from '@interfaces';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootState} from 'src/store/configureStore';
import {connect} from 'react-redux';
import {ICardState} from 'src/store/reducers/card';

type Props = {} & ICardState;

const mapState = (state: RootState) => ({
  productsInCard: state.card.productsInCard,
});

const connector = connect(mapState, null);

const CardScreenComponent: React.FC<Props> = () => {
  const {textColor} = useAppearance();
  const {t} = useTranslation();
  const navigation = useNavigation();

  const contentContainerStyle = useMemo(() => {
    return {
      flexGrow: 1,
      paddingTop: 8,
      paddingHorizontal: 8,
    };
  }, []);

  const renderItem = useCallback(() => {
    return <Block />;
  }, []);

  return (
    <Block flex={1} paddingTop={STATUSBAR_HEIGHT + 40}>
      <Block paddingHorizontal={16}>
        <Typography.B34 color={textColor}>{t('tabs.basket')}</Typography.B34>
      </Block>
      <FlatList
        ListEmptyComponent={
          <ListEmptyComponent
            title={t('cardIsEmpty')}
            buttonTitle={t('goToMenu')}
            onPress={() => navigation.navigate(EScreens.CATALOG_STACK)}
          />
        }
        data={[]}
        contentContainerStyle={contentContainerStyle}
        renderItem={renderItem}
      />
    </Block>
  );
};

export const CardScreen = connector(CardScreenComponent);
