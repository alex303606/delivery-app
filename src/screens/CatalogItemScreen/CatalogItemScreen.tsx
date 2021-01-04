import React, {useCallback} from 'react';
import {ICatalogItem, ICatalogState} from 'src/store/reducers/catalog';
import {RootState} from 'src/store/configureStore';
import {connect} from 'react-redux';
import {Block, FocusAwareStatusBar, Typography} from '@components';
import {Colors} from '@config';
import {CatalogScreenProps} from '@interfaces';
import {useAppearance, useLoading} from '@hooks';
import {FlatList, RefreshControl} from 'react-native';
import {HorizontalCatalogItem} from './HorizontalCatalogItem';
import {bindActionCreators} from 'redux';
import {getSections} from '@actions';
import {SmallCatalogItem} from './SmallCatalogItem';
import styled from 'styled-components';

const keyExtractor = (item: ICatalogItem) => item.ID;

const mapState = (state: RootState) => ({
  catalog: state.catalog.catalog,
});

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getSections,
    },
    dispatch,
  );
};

const connector = connect(mapState, mapDispatchToProps);

type Props = {getSections: () => Promise<any>} & ICatalogState &
  CatalogScreenProps;

const CatalogItemScreenComponent: React.FC<Props> = (props) => {
  const {
    route: {
      params: {parentItem},
    },
  } = props;

  const {themeIsLight} = useAppearance();
  const {loading, hideLoader, showLoader} = useLoading();

  const data = props.catalog.reduce((acc, item) => {
    if (item.PARENT_ID === parentItem.ID) {
      if (item.BIG_PICTURE) {
        // @ts-ignore
        acc.push(item);
      } else {
        const index = acc.findIndex((x: any) => x.length === 1);
        if (index < 0) {
          // @ts-ignore
          acc.push([item]);
        } else {
          // @ts-ignore
          acc[index].push(item);
        }
      }
    }

    return acc;
  }, [] as ICatalogItem[] | ICatalogItem[][]);

  const reload = useCallback(() => {
    showLoader();
    props.getSections().then(() => {
      hideLoader();
    });
  }, [hideLoader, props, showLoader]);

  const renderItemHandler = useCallback(({item}) => {
    if (Array.isArray(item) && item.length) {
      return <SmallCatalogItem item={item} />;
    }
    return <HorizontalCatalogItem item={item} />;
  }, []);

  return (
    <Block flex={1}>
      <FocusAwareStatusBar
        animated={true}
        backgroundColor={themeIsLight ? Colors.white : Colors.black}
      />
      <Block
        elevation={12}
        paddingHorizontal={16}
        paddingTop={12}
        paddingBottom={29}
        backgroundColor={themeIsLight ? Colors.white : Colors.black}>
        <Typography.B34 color={themeIsLight ? Colors.black : Colors.white}>
          {parentItem.NAME}
        </Typography.B34>
      </Block>
      <Block flex={1} paddingHorizontal={5}>
        <List
          showsVerticalScrollIndicator={false}
          keyExtractor={keyExtractor}
          data={data}
          renderItem={renderItemHandler}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={reload} />
          }
        />
      </Block>
    </Block>
  );
};

// @ts-ignore
export const CatalogItemScreen = connector(CatalogItemScreenComponent);

const List = styled(FlatList).attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
    paddingVertical: 5,
  },
}))``;
