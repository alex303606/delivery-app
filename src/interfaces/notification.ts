import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';

export interface ILocalNotificationsClient {
  displayNotification: (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
    channelId?: string,
  ) => Promise<void>;
  checkInitialNotification: () => Promise<void>;
}

export interface INotificationHandlersService {
  getHandler: (
    type: string,
  ) => ((data: FirebaseMessagingTypes.RemoteMessage['data']) => void) | null;
}

export interface IRemoteNotificationsClient {
  getToken: () => Promise<string>;
}
