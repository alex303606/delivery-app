import React from 'react';
import {Block, Button, Typography} from '@components';
import {useAppearance} from '@hooks';
import {STATUSBAR_HEIGHT} from '@config';
import {bindActionCreators} from 'redux';
import {logOut} from '@actions';
import {connect} from 'react-redux';

type Props = {
  logOut: () => void;
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      logOut,
    },
    dispatch,
  );
};

const connector = connect(null, mapDispatchToProps);

export const ProfileScreenComponent: React.FC<Props> = (props) => {
  const {textColor} = useAppearance();

  return (
    <Block flex={1} paddingTop={STATUSBAR_HEIGHT + 16} padding={16}>
      <Typography.B34 color={textColor}>Profile</Typography.B34>
      <Button marginTop={30} title="Log Out" onPress={() => props.logOut()} />
    </Block>
  );
};

export const ProfileScreen = connector(ProfileScreenComponent);
