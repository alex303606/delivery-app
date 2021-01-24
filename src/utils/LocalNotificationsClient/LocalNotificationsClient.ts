import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
  EventType,
  Notification,
} from '@notifee/react-native';
import {
  ILocalNotificationsClient,
  INotificationHandlersService,
} from '@interfaces';

export class LocalNotificationsClient implements ILocalNotificationsClient {
  unsubscribe!: () => void;
  defaultChannelId!: string;
  notificationHandlersService!: INotificationHandlersService;

  constructor(notificationHandlersService: INotificationHandlersService) {
    this.notificationHandlersService = notificationHandlersService;
  }

  init = async () => {
    this.defaultChannelId = await notifee.createChannel({
      id: 'important',
      name: 'Important Notifications',
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
    });

    const onNotificationOpenedAppUnsubscribe = messaging().onNotificationOpenedApp(
      (remoteMessage) => {
        this.handleNotification(remoteMessage);
      },
    );

    const onForegroundEventUnsubscribe = notifee.onForegroundEvent(
      ({type, detail}) => {
        if (type === EventType.ACTION_PRESS || type === EventType.PRESS) {
          if (detail.notification) {
            this.handleNotification(detail.notification);
          }
        }
      },
    );

    this.unsubscribe = () => {
      onNotificationOpenedAppUnsubscribe();
      onForegroundEventUnsubscribe();
    };
  };

  destroy = () => {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  };

  checkInitialNotification = async () => {
    const initialNotification = await messaging().getInitialNotification();
    if (initialNotification) {
      this.handleNotification(initialNotification);
    }
  };

  displayNotification = async (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
  ) => {
    if (remoteMessage.notification) {
      notifee.displayNotification({
        id: remoteMessage.messageId,
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        data: remoteMessage.data,
        android: {
          channelId: this.defaultChannelId,
          importance: AndroidImportance.HIGH,
          visibility: AndroidVisibility.PUBLIC,
        },
      });
    }
  };

  private handleNotification = (notification: Notification) => {
    const type = notification.data?.type;
    if (type) {
      const handler = this.notificationHandlersService.getHandler(type);
      if (handler) {
        handler(notification.data);
      }
    }
  };
}
