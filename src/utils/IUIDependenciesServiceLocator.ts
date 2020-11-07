export interface IUIDependenciesServiceLocator<Deps> {
  get: <K extends keyof Deps>(name: K) => Deps[K];
}

const init = <Deps>(
  dependencies: Deps | null,
): IUIDependenciesServiceLocator<Deps> => ({
  get: <K extends keyof Deps>(name: K) => {
    if (!dependencies) {
      throw new Error('Dependencies not defined yet');
    }
    return dependencies[name];
  },
});

export const UIDependenciesServiceLocator = {
  init,
};
