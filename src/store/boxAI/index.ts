import {createDynamicReducer} from '@/utils/createDynamicReducer';
import {RawBoxAi} from "@/store/boxAI/types";

const {
    setStore,
    reducer,
    sync,
    getByKey,
    useByKey,
    setQueries,
    useKeysByQuery,
} = createDynamicReducer<RawBoxAi>('boxAi', 'id');

export const setBoxAiStore = setStore;
export const boxAiReducer = reducer;
export const syncBoxAi = sync;
export const useBoxAi = useByKey;
export const setBoxAiQueries = setQueries;
export const useBoxAiByQuery = useKeysByQuery;
export const getBoxAi = getByKey;
