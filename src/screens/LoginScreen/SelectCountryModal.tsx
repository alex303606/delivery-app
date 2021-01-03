import React, {useCallback, useRef} from 'react';
import {Block, Button, Modal, Row, Typography} from '@components';
import {FlatList, Pressable, ScrollView, Text} from 'react-native';
import {Colors, COUNTRIES} from '@config';
import styled from 'styled-components';
import {ICountry} from 'src/screens/LoginScreen/interfaces';
import {useTranslation} from 'react-i18next';

interface SelectCountryModalProps {
  setCountry: (item: ICountry) => void;
}

const keyExtractor = (item: ICountry) => item.ru;

export const SelectCountryModal = React.forwardRef<SelectCountryModalProps>(
  ({setCountry}, ref) => {
    const {t} = useTranslation();
    const contentRef = useRef<ScrollView>(null);

    const renderModalHeader = () => (
      <Row paddingVertical={15} justifyContent="center">
        <Typography.B20>{t('selectCountry')}</Typography.B20>
      </Row>
    );

    const handleScrollToTop = () => {
      if (contentRef.current) {
        // @ts-ignore
        contentRef.current?.getScrollResponder().scrollTo({
          y: 0,
          animated: true,
        });
      }
    };

    const renderItem = useCallback(({item}) => {
      return (
        <StyledPressable onPress={() => setCountry(item)}>
          <Row alignItems="center">
            <Flag>{item.flag}</Flag>
            <Typography.B16>{item.ru}</Typography.B16>
          </Row>
        </StyledPressable>
      );
    }, []);

    return (
      <Modal renderHeader={renderModalHeader} ref={ref} contentRef={contentRef}>
        <Block flex={1} paddingHorizontal={16} marginBottom={16}>
          <FlatList
            scrollEnabled={false}
            keyExtractor={keyExtractor}
            data={COUNTRIES}
            renderItem={renderItem}
          />
        </Block>
        <Block paddingHorizontal={32} paddingBottom={32}>
          <Button onPress={handleScrollToTop} title={t('scrollToTop')} />
        </Block>
      </Modal>
    );
  },
);

const StyledPressable = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.grey,
  },
}))`
  margin: 8px 0;
  height: 30px;
`;

const Flag = styled(Text)`
  font-size: 20px;
  margin-right: 15px;
  line-height: 30px;
`;
