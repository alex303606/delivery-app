import {getInfrastructureContainer} from '@utils';
import {init as initPresentation} from './App';
import {PresentationDependencies} from '@interfaces';

export const init = async () => {
  const {
    infrastructureContainer,
    onDestroy,
  } = await getInfrastructureContainer();

  const presentation: PresentationDependencies = {
    ...infrastructureContainer,
  };
  return {mainComponent: initPresentation(presentation), onDestroy};
};
