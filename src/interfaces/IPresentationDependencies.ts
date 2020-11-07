import {INetInfo} from '@utils';
import {INavigationService} from './navigation';
import {IPermissions} from './IPermissions';

export interface PresentationDependencies {
  netInfo: INetInfo;
  navigationService: INavigationService;
  permissions: IPermissions;
}
