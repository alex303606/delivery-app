import React from 'react';
import {Block, InputField, Typography} from '@components';
import {parsePhoneNumberFormatInternational} from '@utils';
import {Colors} from '@config';
import {useTranslation} from 'react-i18next';

type Props = {
  name: string;
  setName: (s: string) => void;
  lastName: string;
  setLastName: (s: string) => void;
  town: string;
  setTown: (s: string) => void;
  phone: string;
  errorMessage: string;
};

export const PersonalDataForm: React.FC<Props> = ({
  name,
  setName,
  lastName,
  setLastName,
  town,
  setTown,
  phone,
  errorMessage,
}) => {
  const {t} = useTranslation();

  return (
    <Block flex={1} marginTop={24}>
      <InputField
        autoCapitalize="words"
        autoCompleteType="name"
        error={name.length < 2}
        changeValue={setName}
        value={name}
        placeholder={t('firstname')}
        label={t('firstname')}
      />
      <InputField
        autoCapitalize="words"
        autoCompleteType="name"
        error={lastName.length < 3}
        changeValue={setLastName}
        value={lastName}
        placeholder={t('lastname')}
        label={t('lastname')}
      />
      <InputField
        error={town.length < 3}
        changeValue={setTown}
        value={town}
        placeholder={t('city')}
        label={t('city')}
      />
      <InputField
        disabled={true}
        changeValue={() => null}
        value={parsePhoneNumberFormatInternational(phone)}
        placeholder={t('phoneNumber')}
        label={t('phoneNumber')}
      />
      <Typography.R16
        marginTop={20}
        textAlign="center"
        color={Colors.notificationError}
        marginBottom={14}>
        {errorMessage}
      </Typography.R16>
    </Block>
  );
};
