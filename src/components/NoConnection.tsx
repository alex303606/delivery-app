import React from 'react';
import {StatusBarNotification} from './StatusBarNotification';
import styled from 'styled-components';
import {Typography} from '@components';
import {ESpacings, Colors} from '@config';
import {useTranslation} from 'react-i18next';

interface NoConnectionProps {
  isVisible: boolean;
  elevation: number;
}

const NoConnectionText = styled(Typography.Body)`
  line-height: 20px;
  padding-top: ${ESpacings.s8}px;
  padding-bottom: ${ESpacings.s8}px;
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
