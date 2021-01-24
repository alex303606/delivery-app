import {
  ILocalNotificationsClient,
  IRemoteNotificationsClient,
} from '@interfaces';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
});

export class FirebaseNotificationsClient implements IRemoteNotificationsClient {
  unsubscribe!: () => void;
  localNotificationClient!: ILocalNotificationsClient;

  constructor(localNotificationClient: ILocalNotificationsClient) {
    this.localNotificationClient = localNotificationClient;
    const onMessageUnsubscribe = messaging().onMessage((remoteMessage) => {
      if (remoteMessage.notification) {
        console.log(remoteMessage);
        this.localNotificationClient.displayNotification(remoteMessage);
      }
    });

    this.unsubscribe = () => {
      onMessageUnsubscribe();
    };
  }

  destroy = () => {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  };

  getToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    return messaging().getToken();
  };
}
