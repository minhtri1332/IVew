import {createDynamicReducer} from '@/utils/createDynamicReducer';
import {RawCustomerRecord} from '@/store/customerRecord/types';

const {
  setStore,
  reducer,
  sync,
  getByKey,
  useByKey,
  setQueries,
  useKeysByQuery,
} = createDynamicReducer<RawCustomerRecord>('customerRecord', 'id');

export const setCustomerRecordStore = setStore;
export const customerRecordReducer = reducer;
export const syncCustomerRecord = sync;
export const useCustomerRecord = useByKey;
export const setCustomerRecordQueries = setQueries;
export const useCustomerRecordByQuery = useKeysByQuery;
export const getCustomerRecord = getByKey;
