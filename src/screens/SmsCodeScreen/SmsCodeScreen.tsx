import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Block, Typography} from '@components';
import {Colors} from '@config';

const SmsCodeScreenComponent = () => {
  return (
    <Block flex={1} backgroundColor={Colors.background}>
      <Typography.S14 marginBottom={14}>nvfjdbnkl</Typography.S14>
    </Block>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export const SmsCodeScreen = connect(
  null,
  mapDispatchToProps,
)(SmsCodeScreenComponent);
