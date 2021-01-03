import React from 'react';
import {StatusBarNotification} from './StatusBarNotification';
import styled from 'styled-components';
import {Typography} from '@components';
import {Colors} from '@config';
import {useTranslation} from 'react-i18next';

interface NoConnectionProps {
  isVisible: boolean;
  elevation: number;
}

const NoConnectionText = styled(Typography.R16)`
  line-height: 20px;
  padding-top: 8px;
  padding-bottom: 8px;
  color: ${Colors.white};
`;

export const NoConnection: React.FC<NoConnectionProps> = React.memo(
  ({isVisible, elevation}) => {
    const {t} = useTranslation();

    return (
      <StyledStatusBarNotification isVisible={isVisible} elevation={elevation}>
        <NoConnectionText testID="noConnectionText">
          {t('notifications.noConnection')}
        </NoConnectionText>
      </StyledStatusBarNotification>
    );
  },
);

const StyledStatusBarNotification = styled(StatusBarNotification)`
  background-color: ${Colors.notificationError};
  elevation: ${({elevation}: {elevation: number}) => elevation};
`;
