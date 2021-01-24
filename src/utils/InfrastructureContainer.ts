import {I18nextClient} from '../localization/I18nextClient';
import {
  NetInfo,
  NavigationService,
  Permissions,
  FirebaseNotificationsClient,
  LocalNotificationsClient,
  NotificationHandlersService,
} from '@utils';

export const getInfrastructureContainer = async () => {
  const localization = new I18nextClient();
  const netInfo = NetInfo;
  const permissions = new Permissions();
  const navigationService = new NavigationService();
  await localization.init();
  const notificationHandlersService = new NotificationHandlersService(
    navigationService,
  );
  const localNotificationClient = new LocalNotificationsClient(
    notificationHandlersService,
  );
  await localNotificationClient.init();

  const remoteNotificationClient = new FirebaseNotificationsClient(
    localNotificationClient,
  );

  const onDestroy = () => {
    remoteNotificationClient.destroy();
    localNotificationClient.destroy();
  };

  return {
    infrastructureContainer: {
      netInfo,
      navigationService,
      permissions,
      localNotificationClient,
      remoteNotificationClient,
    },
    onDestroy,
  };
};
