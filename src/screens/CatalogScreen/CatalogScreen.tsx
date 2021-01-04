import React from 'react';
import {bindActionCreators} from 'redux';
import {logOut} from '@actions';
import {connect, ConnectedProps} from 'react-redux';
import {Block, Button, Typography} from '@components';
import {UseAppearance} from '@hooks';

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      logOut,
    },
    dispatch,
  );
};

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = {
  logOut: () => void;
} & PropsFromRedux;

const CatalogScreenComponent: React.FC<Props> = (props) => {
  const {textColor} = UseAppearance();

  return (
    <Block flex={1} padding={16}>
      <Typography.B34 color={textColor}>Catalog</Typography.B34>
      <Button marginTop={30} title="Log Out" onPress={() => props.logOut()} />
    </Block>
  );
};

// @ts-ignore
export const CatalogScreen = connector(CatalogScreenComponent);
