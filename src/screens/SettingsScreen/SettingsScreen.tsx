import React from 'react';
import {Block, Typography} from '@components';
import {useAppearance} from '@hooks';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
type Props = {};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({}, dispatch);
};

const connector = connect(null, mapDispatchToProps);

const SettingsScreenComponent: React.FC<Props> = () => {
  const {textColor} = useAppearance();
  const {t} = useTranslation();

  return (
    <Block flex={1} padding={16}>
      <Typography.B34 color={textColor}>{t('settings')}</Typography.B34>
      <Block flex={1} marginTop={24} />
    </Block>
  );
};

export const SettingsScreen = connector(SettingsScreenComponent);
