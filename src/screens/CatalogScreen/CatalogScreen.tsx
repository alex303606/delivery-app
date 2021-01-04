import React, {useCallback} from 'react';
import {connect} from 'react-redux';
import {Block, FocusAwareStatusBar, Typography} from '@components';
import {Colors} from '@config';
import styled from 'styled-components';
import {FlatList, ImageBackground, RefreshControl} from 'react-native';
import {ICatalogItem, ICatalogState} from 'src/store/reducers/catalog';
import {RootState} from 'src/store/configureStore';
import {BigCatalogItem} from './BigCatalogItem';
import {bindActionCreators} from 'redux';
import {getSections} from '@actions';
import {useLoading} from '@hooks';

const banner = require('@assets/images/banner.png');
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

type Props = {
  getSections: () => Promise<any>;
} & ICatalogState;

const connector = connect(mapState, mapDispatchToProps);

const CatalogScreenComponent: React.FC<Props> = (props) => {
  const mainCatalog = props.catalog.filter(
    (x: ICatalogItem) => x.DEPTH_LEVEL === '1',
  );
  const {loading, hideLoader, showLoader} = useLoading();
  const renderItemHandler = useCallback(
    ({item, index}: {item: ICatalogItem; index: number}) => {
      return <BigCatalogItem index={index} item={item} />;
    },
    [],
  );

  const reload = useCallback(() => {
    showLoader();
    props.getSections().then(() => {
      hideLoader();
    });
  }, [hideLoader, props, showLoader]);

  return (
    <Block flex={1}>
      <FocusAwareStatusBar
        animated={true}
        backgroundColor={Colors.transparent}
        barStyle="light-content"
      />
      <StyledImage source={banner}>
        <Typography.B24 color={Colors.white}>BRAND </Typography.B24>
        <Typography.B24 color={Colors.white}>GALLERY</Typography.B24>
      </StyledImage>
      <Block flex={1} paddingHorizontal={5}>
        <List
          showsVerticalScrollIndicator={false}
          keyExtractor={keyExtractor}
          data={mainCatalog}
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
export const CatalogScreen = connector(CatalogScreenComponent);

const StyledImage = styled(ImageBackground)`
  width: 100%;
  height: 170px;
  padding: 20px;
  align-items: flex-start;
  justify-content: flex-end;
  elevation: 12;
`;

const List = styled(FlatList).attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
    paddingVertical: 5,
  },
}))``;
