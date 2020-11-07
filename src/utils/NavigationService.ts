import {EScreens, INavigationService} from '@interfaces';
import {NavigationContainerRef} from '@react-navigation/native';
import React, {MutableRefObject} from 'react';

export class NavigationService implements INavigationService {
  navigationRef = React.createRef<NavigationContainerRef>();
  isReadyRef = React.createRef<boolean>() as MutableRefObject<boolean>;

  navigate = (name: EScreens, params: {[key: string]: any}) => {
    if (this.navigationRef.current && this.isReadyRef.current) {
      this.navigationRef.current.navigate(name, params);
    }
  };
}
