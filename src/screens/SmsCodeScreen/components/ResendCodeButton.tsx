import React from 'react';
import {useTranslation} from 'react-i18next';
import {useTimoutTimer} from '../hooks/useTimeoutTimer';
import {Button} from '@components';

interface IProps {
  startTimeInMillis: number;
  timeout: number;
  resendCode: () => void;
}

export const ResendCodeButton: React.FC<IProps> = React.memo(
  ({startTimeInMillis, timeout, resendCode}) => {
    const {t} = useTranslation();
    const count = useTimoutTimer(startTimeInMillis, timeout);
    const buttonDisabled = count !== 0;
    const title = buttonDisabled
      ? t('waitingToSendSms', {count: count.toString()})
      : t('resendSms');

    return (
      <Button
        marginTop={20}
        onPress={resendCode}
        title={title}
        disabled={buttonDisabled}
      />
    );
  },
);
