import React from 'react';
import {Button, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {EScreens} from '@interfaces';
import {useTranslation} from 'react-i18next';

export const HomeScreen = () => {
  const {navigate} = useNavigation();
  const {i18n} = useTranslation();

  return (
    <View>
      <Button title="go to en" onPress={() => i18n.changeLanguage('en')} />
      <Button title="go to ru" onPress={() => i18n.changeLanguage('ru')} />
      <Button
        title="navigate to SEARCH"
        onPress={() => navigate(EScreens.SEARCH_STACK)}
      />
    </View>
  );
};
