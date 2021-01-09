import React from 'react';
import {
  Block,
  Button,
  IconNames,
  Row,
  Typography,
  Icon,
  RowButton,
  RoundButton,
} from '@components';
import {useAppearance} from '@hooks';
import {Colors, STATUSBAR_HEIGHT} from '@config';
import {bindActionCreators} from 'redux';
import {logOut} from '@actions';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {EScreens} from '@interfaces';
import {RootState} from 'src/store/configureStore';
import {parsePhoneNumberFormatInternational} from '@utils';
type Props = {
  logOut: () => void;
} & RootState;

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      logOut,
    },
    dispatch,
  );
};

const mapState = (state: RootState) => ({
  profile: state.profile,
});

const connector = connect(mapState, mapDispatchToProps);

export const ProfileScreenComponent: React.FC<Props> = (props) => {
  const {textColor} = useAppearance();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {firstname, lastname, phone, documents} = props.profile;

  return (
    <Block flex={1} paddingTop={STATUSBAR_HEIGHT + 40} padding={16}>
      <Typography.B34 color={textColor}>{t('tabs.profile')}</Typography.B34>
      <Block flex={1} marginTop={24}>
        <Row alignItems="center" paddingHorizontal={16} marginBottom={50}>
          <Icon
            size={32}
            color={Colors.grey}
            name={IconNames.profileInactive}
          />
          <Block marginLeft={36} flex={1} justifyContent="center">
            <Typography.B18 color={textColor}>
              {firstname || t('firstname')} {lastname || t('lastname')}
            </Typography.B18>
            <Typography.R14 color={Colors.grey}>
              {parsePhoneNumberFormatInternational(phone)}
            </Typography.R14>
          </Block>
          <RoundButton
            iconSize={32}
            onPress={() => navigation.navigate(EScreens.PERSONAL_DATA_SCREEN)}
            iconName="settings-outline"
            diameter={50}
          />
        </Row>
        <RowButton
          onPress={() => navigation.navigate(EScreens.ORDERS_SCREEN)}
          title={t('orders')}
          description={t('completedOrders', {count: 15})}
        />
        <RowButton
          onPress={() => navigation.navigate(EScreens.SETTINGS_SCREEN)}
          title={t('settings')}
          description={t('notificationsText')}
        />
        {documents.map(
          (document: {name: string; text: string}, index: number) => {
            return (
              <RowButton
                key={document.name}
                onPress={() =>
                  navigation.navigate(EScreens.APP_DATA_SCREEN, {index})
                }
                title={document.name}
              />
            );
          },
        )}
      </Block>
      <Button
        marginTop={30}
        title={t('logOut')}
        onPress={() => props.logOut()}
      />
    </Block>
  );
};

export const ProfileScreen = connector(ProfileScreenComponent);
