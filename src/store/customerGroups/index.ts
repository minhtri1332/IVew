import {createDynamicReducer} from '@/utils/createDynamicReducer';
import {RawCustomerGroup} from '@/store/customerGroups/types';

const {
  setStore,
  reducer,
  sync,
  getByKey,
  useByKey,
  setQueries,
  useKeysByQuery,
} = createDynamicReducer<RawCustomerGroup>('customerGroup', 'id');

export const setCustomerGroupStore = setStore;
export const customerGroupReducer = reducer;
export const syncCustomerGroup = sync;
export const useCustomerGroup = useByKey;
export const setCustomerGroupQueries = setQueries;
export const useCustomerGroupByQuery = useKeysByQuery;
export const getCustomerGroup = getByKey;
