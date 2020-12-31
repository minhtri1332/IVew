import {useCallback, useState} from 'react';
import {useUpdateEffect, useLatest} from '@base/core/hooks';

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
