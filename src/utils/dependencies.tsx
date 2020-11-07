import React from 'react';
import {
  IUIDependenciesServiceLocator,
  UIDependenciesServiceLocator,
} from './IUIDependenciesServiceLocator';
import {PresentationDependencies} from '@interfaces';

export const DependenciesContext = React.createContext<
  IUIDependenciesServiceLocator<PresentationDependencies>
>(UIDependenciesServiceLocator.init(null as PresentationDependencies | null));
