import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import {NativeModules} from 'react-native';
import {ruTranslation} from './ru';
import {enTranslation} from './en';

export class I18nextClient {
  private readonly locale: string;
  constructor() {
    const localeIdentifier = NativeModules.I18nManager.localeIdentifier;
    this.locale = localeIdentifier.replace(/_/, '-') as string;
  }

  init = async () => {
    const locale = this.locale;
    await i18next.use(initReactI18next).init({
      fallbackLng: 'ru',
      lng: locale,
      debug: __DEV__,
      resources: {
        ru: ruTranslation,
        en: enTranslation,
      },
      interpolation: {
        escapeValue: false,
      },
    });
    return this;
  };
}
