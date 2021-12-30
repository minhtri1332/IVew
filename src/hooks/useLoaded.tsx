import {useCallback, useState} from 'react';
import {useLatest, useUpdateEffect} from '@/hooks/index';

export const useLoaded = (loading: boolean) => {
  const [loaded, setLoaded] = useState(false);
  const latestLoaded = useLatest(loaded);

  useUpdateEffect(() => {
    if (!loading) {
      setLoaded(true);
    }
  }, [loading]);

  return useCallback(() => {
    return latestLoaded.current;
  }, []);
};
