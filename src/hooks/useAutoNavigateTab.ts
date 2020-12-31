import {useMemo} from 'react';
import {useRoute} from '@/global';

/**
 * get index if list string for get initial tab active
 * example: Company -> Department || Teams || People
 * => keys ['CompanyDepartment', 'CompanyTeams', 'CompanyPeople']
 */

export const useAutoNavigateTab = (tabs: string[]) => {
  const {params} = useRoute();

  return useMemo(() => {
    const output = tabs.indexOf(params?.screen);
    return output < 0 ? 0 : output;
  }, [params]);
};
