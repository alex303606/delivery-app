import {useCallback, useState} from 'react';

export const useLoading = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const showLoader = useCallback(() => {
    setLoading(true);
  }, [setLoading]);

  const hideLoader = useCallback(() => {
    setLoading(false);
  }, [setLoading]);

  return {
    showLoader,
    hideLoader,
    loading,
  };
};
