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
import {Root} from '@navigators';
import {PresentationDependencies} from '@interfaces';
import {Colors} from '@config';
import {ConnectionHandler, Loader} from '@components';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import {useAppearance} from '@hooks';

enableScreens();

const {persistor, store} = configureStore();
// @ts-ignore
if (Text && !Text.defaultProps) {
  // @ts-ignore
  Text.defaultProps = {};
  // @ts-ignore
  Text.defaultProps.allowFontScaling = false;
}

const getMainComponent = (deps: PresentationDependencies) => {
  const MainComponent: React.FC = () => {
    const systemColorScheme = useColorScheme();
    const {navigationService} = deps;
    const {backgroundColor} = useAppearance();

    return (
      <DependenciesContext.Provider
        value={UIDependenciesServiceLocator.init(deps)}>
        <Provider store={store}>
          <PersistGate
            loading={<Loader background={backgroundColor} color={Colors.white}/>}
            persistor={persistor}>
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
                      systemColorScheme === 'dark'
                        ? styledThemeDark
                        : styledTheme
                    }>
                    <StatusBar
                      translucent={true}
                      barStyle={
                        systemColorScheme === 'dark'
                          ? 'light-content'
                          : 'dark-content'
                      }
                      backgroundColor={
                        systemColorScheme === 'dark'
                          ? Colors.black
                          : Colors.statusBarBackgroundColor
                      }
                    />
                    <ConnectionHandler />
                    <Root />
                  </ThemeProvider>
                </NavigationContainer>
              </AppearanceProvider>
            </SafeAreaProvider>
          </PersistGate>
        </Provider>
      </DependenciesContext.Provider>
    );
  };

  return MainComponent;
};

export const init = (dependencies: PresentationDependencies) =>
  getMainComponent(dependencies);
