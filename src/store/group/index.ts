import {createDynamicReducer} from '@/utils/createDynamicReducer';
import {RawGroup} from "@/store/group/types";

const {
    setStore,
    reducer,
    sync,
    getByKey,
    useByKey,
    setQueries,
    useKeysByQuery,
} = createDynamicReducer<RawGroup>('group', 'id');

export const setGroupStore = setStore;
export const groupReducer = reducer;
export const syncGroup = sync;
export const useGroup = useByKey;
export const setGroupQueries = setQueries;
export const useGroupByQuery = useKeysByQuery;
export const getGroup = getByKey;
