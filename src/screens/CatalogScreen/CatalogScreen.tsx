import React from 'react';
import {bindActionCreators} from 'redux';
import {logOut} from '@actions';
import {connect, ConnectedProps} from 'react-redux';
import {Block, Button, FocusAwareStatusBar, Typography} from '@components';
import {UseAppearance} from '@hooks';
import {Colors} from '@config';
import styled from 'styled-components';
import {ImageBackground} from 'react-native';

const banner = require('@assets/images/banner.png');

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
    <Block flex={1}>
      <StyledImage source={banner}>
        <Typography.B28 color={Colors.white}>BRAND </Typography.B28>
        <Typography.B28 color={Colors.white}>GALLERY</Typography.B28>
      </StyledImage>
      <FocusAwareStatusBar
        animated={true}
        backgroundColor={Colors.transparent}
        barStyle="light-content"
      />
      <Block padding={16}>
        <Typography.B34 color={textColor}>Catalog</Typography.B34>
        <Button marginTop={30} title="Log Out" onPress={() => props.logOut()} />
      </Block>
    </Block>
  );
};

// @ts-ignore
export const CatalogScreen = connector(CatalogScreenComponent);

export const StyledImage = styled(ImageBackground)`
  width: 100%;
  height: 170px;
  padding: 20px;
  align-items: flex-start;
  justify-content: flex-end;
  margin-bottom: 10px;
`;
