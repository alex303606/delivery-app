import 'react-native-gesture-handler';
import {ThemeProvider} from 'styled-components';
import React from 'react';
import {
  styledTheme,
  styledThemeDark,
  navigationTheme,
  navigationThemeDark,
  DependenciesContext,
  UIDependenciesServiceLocator,
} from '@utils';
import {NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';
import {Text, StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import {RootTabs} from '@navigators';
import {PresentationDependencies, EScreens} from '@interfaces';
import {Colors} from '@config';
import {ConnectionHandler} from '@components';

enableScreens();
const Stack = createStackNavigator();

const getMainComponent = (deps: PresentationDependencies) => {
  const MainComponent: React.FC = () => {
    const systemColorScheme = useColorScheme();
    const {navigationService} = deps;

    return (
      <DependenciesContext.Provider
        value={UIDependenciesServiceLocator.init(deps)}>
        <SafeAreaProvider>
          <AppearanceProvider>
            <NavigationContainer
              ref={navigationService.navigationRef}
              onReady={() => {
                navigationService.isReadyRef.current = true;
              }}
              fallback={<Text>Loading...</Text>}
              theme={
                systemColorScheme === 'dark'
                  ? navigationThemeDark
                  : navigationTheme
              }>
              <ThemeProvider
                theme={
                  systemColorScheme === 'dark' ? styledThemeDark : styledTheme
                }>
                <StatusBar
                  barStyle="dark-content"
                  backgroundColor={Colors.statusBarBackgroundColor}
                />
                <ConnectionHandler />
                <Stack.Navigator headerMode="none">
                  <Stack.Screen name={EScreens.ROOT_TABS} component={RootTabs} />
                </Stack.Navigator>
              </ThemeProvider>
            </NavigationContainer>
          </AppearanceProvider>
        </SafeAreaProvider>
      </DependenciesContext.Provider>
    );
  };

  return MainComponent;
};

export const init = (dependencies: PresentationDependencies) =>
  getMainComponent(dependencies);
