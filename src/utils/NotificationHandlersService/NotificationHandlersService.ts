import {INavigationService, INotificationHandlersService} from '@interfaces';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';

export class NotificationHandlersService
  implements INotificationHandlersService {
  navigationService!: INavigationService;
  handlers: {
    [type: string]: (
      data: FirebaseMessagingTypes.RemoteMessage['data'],
    ) => void;
  } = {};

  constructor(navigationService: INavigationService) {
    this.navigationService = navigationService;
  }

  getHandler = (type: string) => {
    if (this.handlers[type]) {
      return this.handlers[type];
    } else {
      return null;
    }
  };
}
