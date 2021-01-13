import {createDynamicReducer} from '@/utils/createDynamicReducer';
import {RawHistory} from "@/store/history/types";

export const {
  setStore: setHistoryStore,
  actions: historyActions,
  useByKey: useHistory,
  useKeysByQuery: useHistoryByQuery,
  getByKey: getHistoryByKey,
  reducer: historyReducer,
  getKeysByQuery: getHistoryByQuery,
  sync: syncHistory,
  setQueries: setHistoryQueries,
} = createDynamicReducer<RawHistory>("history", "id");


