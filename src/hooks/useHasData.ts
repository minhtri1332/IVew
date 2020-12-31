import {useMemo} from 'react';
import {useSelector} from 'react-redux';

const emptyObj = {};
export const useHasData = (name: string) => {
  const byKey = useSelector((state: any) =>
    state[name] && state[name].byKey ? state[name].byKey : emptyObj,
  );
  return useMemo(() => Object.keys(byKey).length > 0, [byKey]);
};

export const useHasPromotion = () => useHasData('promotions');
export const useHasPlanning = () => useHasData('plannings');
