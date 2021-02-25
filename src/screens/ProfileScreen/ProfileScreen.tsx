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
  ScrollContainer,
} from '@components';
import {useAppearance} from '@hooks';
import {Colors, STATUSBAR_HEIGHT, WINDOW_WIDTH} from '@config';
import {bindActionCreators} from 'redux';
import {logOut} from '@actions';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {EScreens} from '@interfaces';
import {RootState} from 'src/store/configureStore';
import {getImage, parsePhoneNumberFormatInternational} from '@utils';
import styled from 'styled-components';
import {Image} from 'react-native';
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

const ProfileScreenComponent: React.FC<Props> = (props) => {
  const {textColor} = useAppearance();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {firstname, lastname, phone, id, documents} = props.profile;

  return (
    <Block flex={1} paddingVertical={16}>
      <Block flex={1} marginTop={24}>
        <Row paddingHorizontal={16} marginBottom={10}>
          <StyledImage
            source={getImage(
              'https://brandgallery.kido.kg/upload/iblock/5ed/5ed58e9555948282f96570dbaa9caf29.png',
            )}
          />

          <Block paddingTop={5} marginLeft={10} flex={1}>
            <Row marginBottom={10} alignItems="center" justifyContent="space-between">
              <Row flex={1} paddingRight={30}>
                <Typography.R18 numberOfLines={1} color={textColor}>
                  Игнатенко Михаил Федорович
                  Игнатенко Михаил Федорович
                  Игнатенко Михаил Федорович
                  Игнатенко Михаил Федорович
                  {/*{firstname || t('firstname')} {lastname || t('lastname')}*/}
                </Typography.R18>
              </Row>
              <RoundButton
                iconSize={30}
                onPress={() =>
                  navigation.navigate(EScreens.PERSONAL_DATA_SCREEN)
                }
                iconName="settings-outline"
                iconColor={Colors.darkGreen}
                diameter={30}
              />
            </Row>
            <Typography.R14 color={Colors.grey}>{`ID ${id}`}</Typography.R14>
          </Block>
        </Row>
        <Block backgroundColor={Colors.black} paddingBottom={1} />
        <ScrollContainer>
          <StyledLineBlock>
            <RowButton
              onPress={() => navigation.navigate(EScreens.ORDERS_SCREEN)}
              title={'Задания'}
            />
          </StyledLineBlock>
          <StyledLineBlock>
            <RowButton
              onPress={() => navigation.navigate(EScreens.SETTINGS_SCREEN)}
              title={'Офис онлайн'}
            />
          </StyledLineBlock>
          <StyledLineBlock>
            <RowButton
              onPress={() => navigation.navigate(EScreens.ORDERS_SCREEN)}
              title={'Споры'}
            />
          </StyledLineBlock>
          <StyledLineBlock>
            <RowButton
              onPress={() => navigation.navigate(EScreens.SETTINGS_SCREEN)}
              title={'Мои отзывы'}
            />
          </StyledLineBlock>
          <StyledLineBlock>
            <RowButton
              onPress={() => navigation.navigate(EScreens.ORDERS_SCREEN)}
              title={'Уведомления'}
            />
          </StyledLineBlock>
          <StyledLineBlock>
            <RowButton
              onPress={() => navigation.navigate(EScreens.APP_DATA_SCREEN)}
              icon={false}
              title={'Лицензионное соглашение'}
            />
          </StyledLineBlock>
          <StyledLineBlock>
            <RowButton
              onPress={() => navigation.navigate(EScreens.APP_DATA_SCREEN)}
              icon={false}
              title={'Политика конфиденциальности'}
            />
          </StyledLineBlock>
          <StyledLineBlock>
            <RowButton
              onPress={() => navigation.navigate(EScreens.APP_DATA_SCREEN)}
              icon={false}
              title={'Служба поддержки'}
            />
          </StyledLineBlock>

          {/*{documents.map(*/}
          {/*  (document: {name: string; text: string}, index: number) => {*/}
          {/*    return (*/}
          {/*      <Block key={index}>*/}
          {/*        <RowButton*/}
          {/*          onPress={() =>*/}
          {/*            navigation.navigate(EScreens.APP_DATA_SCREEN, {index})*/}
          {/*          }*/}
          {/*          title={document.name}*/}
          {/*        />*/}
          {/*        <Block backgroundColor={Colors.black} paddingBottom={1} />*/}
          {/*      </Block>*/}
          {/*    );*/}
          {/*  },*/}
          {/*)}*/}
        </ScrollContainer>
      </Block>
      <Block paddingHorizontal={16}>
        <Button
          marginTop={30}
          title={t('logOut')}
          onPress={() => props.logOut()}
        />
      </Block>
    </Block>
  );
};

const StyledImage = styled(Image)`
  height: 80px;
  width: 80px;
  border-radius: 40px;
`;

const StyledLineBlock = styled(Block)`
  border-bottom-width: 1px;
  color: red;
`;

export const ProfileScreen = connector(ProfileScreenComponent);
