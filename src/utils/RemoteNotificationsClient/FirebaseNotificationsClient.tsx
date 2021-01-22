import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {Alert, View} from 'react-native';
type IRemoteNotificationsClient = {
  updateUserDate: (token: string) => void;
  userIsLoggedIn: boolean;
};

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
});

export const FirebaseNotificationsClient: React.FC<IRemoteNotificationsClient> = (
  props,
) => {
  useEffect(() => {
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFcmToken();
      console.log('Authorization status:', authStatus);
    }
  };

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken && props.userIsLoggedIn) {
      props.updateUserDate(fcmToken);
      console.log('Your Firebase Token is:', fcmToken);
    } else {
      console.log('Failed', 'No token received');
    }
  };

  return <View />;
};
