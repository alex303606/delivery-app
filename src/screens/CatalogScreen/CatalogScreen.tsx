import React, {useCallback, useMemo} from 'react';
import {connect} from 'react-redux';
import {Block, FocusAwareStatusBar} from '@components';
import {Colors, COLLAPSIBLE_HEADER_HEIGHT} from '@config';
import {FlatList, RefreshControl} from 'react-native';
import {ICatalogItem, ICatalogState} from 'src/store/reducers/catalog';
import {RootState} from 'src/store/configureStore';
import {BigCatalogItem} from './BigCatalogItem';
import {bindActionCreators} from 'redux';
import {getSections} from '@actions';
import {useLoading, useScrollHandler, useSetScreenOptions} from '@hooks';
import Animated from 'react-native-reanimated';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
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
  const {scrollY, onScroll} = useScrollHandler();
  useSetScreenOptions(
    {
      animatedValue: scrollY,
    },
    [scrollY],
  );

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

  const contentContainerStyle = useMemo(() => {
    return {
      flexGrow: 1,
      paddingTop: COLLAPSIBLE_HEADER_HEIGHT + 8,
      paddingHorizontal: 8,
    };
  }, []);

  return (
    <Block flex={1}>
      <FocusAwareStatusBar
        animated={true}
        backgroundColor={Colors.transparent}
        barStyle="light-content"
      />
      <Block flex={1}>
        <AnimatedFlatList
          contentContainerStyle={contentContainerStyle}
          progressViewOffset={COLLAPSIBLE_HEADER_HEIGHT}
          onScroll={onScroll}
          showsVerticalScrollIndicator={false}
          keyExtractor={keyExtractor}
          data={mainCatalog}
          renderItem={renderItemHandler}
          refreshControl={
            <RefreshControl
              progressViewOffset={COLLAPSIBLE_HEADER_HEIGHT}
              refreshing={loading}
              onRefresh={reload}
            />
          }
        />
      </Block>
    </Block>
  );
};

// @ts-ignore
export const CatalogScreen = connector(CatalogScreenComponent);
