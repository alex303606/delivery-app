import {I18nextClient} from '../localization/I18nextClient';
import {NetInfo, NavigationService, Permissions} from '@utils';

export const getInfrastructureContainer = async () => {
  const localization = new I18nextClient();
  const netInfo = NetInfo;
  const permissions = new Permissions();
  const navigationService = new NavigationService();
  await localization.init();

  const onDestroy = () => {
    return null;
  };

  return {
    infrastructureContainer: {
      netInfo,
      navigationService,
      permissions,
    },
    onDestroy,
  };
};
