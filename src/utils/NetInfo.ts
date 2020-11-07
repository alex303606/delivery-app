import RNNetInfo from '@react-native-community/netinfo';

export interface INetInfoState {
  isConnected: boolean | undefined;
  isInternetReachable: boolean | null | undefined;
}

export type NetInfoSubscription = () => void;

export type NetInfoChangeHandler = (state: INetInfoState) => void;

export interface INetInfo {
  fetch: (requestedInterface?: string) => Promise<INetInfoState>;
  addEventListener(listener: NetInfoChangeHandler): NetInfoSubscription;
}

export const NetInfo: INetInfo = RNNetInfo;
