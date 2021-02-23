import {createDynamicReducer} from '@/utils/createDynamicReducer';
import {RawDepartment} from "@/store/Department/types";

const {
    setStore,
    reducer,
    sync,
    getByKey,
    useByKey,
    setQueries,
    useKeysByQuery,
} = createDynamicReducer<RawDepartment>('department', 'id');

export const setDepartmentStore = setStore;
export const departmentReducer = reducer;
export const syncDepartment = sync;
export const useDepartment = useByKey;
export const setDepartmentQueries = setQueries;
export const useDepartmentByQuery = useKeysByQuery;
export const getDepartment = getByKey;
