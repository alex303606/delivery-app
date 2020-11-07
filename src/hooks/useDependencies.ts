import {useContext} from 'react';
import {DependenciesContext} from '@utils';

export const useDependencies = () => {
  return useContext(DependenciesContext);
};
