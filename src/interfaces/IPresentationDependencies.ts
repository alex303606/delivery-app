import {INetInfo} from '@utils';
import {INavigationService} from './navigation';
import {IPermissions} from './IPermissions';
import {
  ILocalNotificationsClient,
  IRemoteNotificationsClient,
} from '@interfaces';

export interface PresentationDependencies {
  netInfo: INetInfo;
  navigationService: INavigationService;
  permissions: IPermissions;
  localNotificationClient: ILocalNotificationsClient;
  remoteNotificationClient: IRemoteNotificationsClient;
}
