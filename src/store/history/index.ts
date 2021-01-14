import {createDynamicReducer} from '@/utils/createDynamicReducer';
import {RawHistory, RawTest} from "@/store/history/types";

const {
  setStore,
  reducer,
  sync,
  useByKey,
  setQueries,
  useKeysByQuery,
} = createDynamicReducer<RawTest>('history', 'id');

export const setHistoryStore = setStore;
export const historyReducer = reducer;
export const syncHistory = sync;
export const useHistory = useByKey;
export const setHistoryQueries = setQueries;
export const useHistoryByQuery = useKeysByQuery;
