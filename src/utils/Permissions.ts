import {Permission, PermissionsAndroid, PermissionStatus} from 'react-native';
import {IPermissionParams, IPermissions} from '@interfaces';

export class Permissions implements IPermissions {
  async runLocationFeature(params: IPermissionParams) {
    await Permissions.runFeature({
      ...params,
      feature: PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    });
  }

  private static async runFeature({
    feature,
    successCallback,
    onPermissionGranted,
    onPermissionForbidden,
    afterPermission,
  }: {feature: Permission} & IPermissionParams) {
    const checkResult = await PermissionsAndroid.check(feature);
    if (checkResult) {
      successCallback();
    } else {
      const permission = await Permissions.requestPermission(feature);
      if (permission === PermissionsAndroid.RESULTS.GRANTED) {
        if (onPermissionGranted) {
          onPermissionGranted();
        } else {
          successCallback();
        }
      } else if (permission === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        onPermissionForbidden?.();
      }
    }
    afterPermission?.();
  }

  private static activeRequests: {
    [key: string]: Promise<PermissionStatus> | null;
  } = {};
  private static async requestPermission(
    feature: Permission,
  ): Promise<PermissionStatus> {
    const request =
      Permissions.activeRequests[feature] ||
      PermissionsAndroid.request(feature);

    Permissions.activeRequests[feature] = request;
    const permission = await request;
    Permissions.activeRequests[feature] = null;

    return permission;
  }
}
