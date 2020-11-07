export interface IPermissionParams {
  successCallback: () => void;
  onPermissionForbidden?: () => void;
  onPermissionGranted?: () => void;
  afterPermission?: () => void;
}

export interface IPermissions {
  runLocationFeature: (params: IPermissionParams) => void;
}
