import React, {useCallback, useMemo} from 'react';
import {ICatalogItem, ICatalogState} from 'src/store/reducers/catalog';
import {RootState} from 'src/store/configureStore';
import {connect} from 'react-redux';
import {Block, FocusAwareStatusBar} from '@components';
import {COLLAPSIBLE_HEADER_HEIGHT, Colors} from '@config';
import {CatalogScreenProps} from '@interfaces';
import {
  useAppearance,
  useLoading,
  useSetScreenOptions,
  useScrollHandler,
} from '@hooks';
import {FlatList, RefreshControl} from 'react-native';
import {HorizontalCatalogItem} from './HorizontalCatalogItem';
import {bindActionCreators} from 'redux';
import {getSections} from '@actions';
import {SmallCatalogItem} from './SmallCatalogItem';
import Animated from 'react-native-reanimated';
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const transformCatalogArray = (
  catalog: ICatalogItem[],
  parentItem: ICatalogItem,
) => {
  return catalog.reduce((acc, item, index) => {
    if (item.PARENT_ID === parentItem.ID) {
      if (++index % 3 === 0) {
        // @ts-ignore
        acc.push(item);
      } else {
        const i = acc.findIndex((x: any) => x.length === 1);
        if (i < 0) {
          // @ts-ignore
          acc.push([item]);
        } else {
          // @ts-ignore
          acc[i].push(item);
        }
      }
    }

    return acc;
  }, [] as any);
};

const keyExtractor = (item: any) => (item.length ? item[0].ID : item.ID);

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
  const {scrollY, onScroll} = useScrollHandler();
  useSetScreenOptions(
    {
      animatedValue: scrollY,
    },
    [scrollY],
  );

  const {themeIsLight} = useAppearance();
  const {loading, hideLoader, showLoader} = useLoading();

  const data = useMemo(() => transformCatalogArray(props.catalog, parentItem), [
    props.catalog,
    parentItem,
  ]);

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

  const contentContainerStyle = useMemo(() => {
    return {
      flexGrow: 1,
      paddingVertical: 5,
      paddingTop: COLLAPSIBLE_HEADER_HEIGHT,
    };
  }, []);

  return (
    <Block flex={1}>
      <FocusAwareStatusBar
        animated={true}
        backgroundColor={themeIsLight ? Colors.white : Colors.black}
      />
      <Block flex={1} padding={8}>
        <AnimatedFlatList
          contentContainerStyle={contentContainerStyle}
          progressViewOffset={COLLAPSIBLE_HEADER_HEIGHT}
          showsVerticalScrollIndicator={false}
          keyExtractor={keyExtractor}
          data={data}
          renderItem={renderItemHandler}
          onScroll={onScroll}
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
export const CatalogItemScreen = connector(CatalogItemScreenComponent);
