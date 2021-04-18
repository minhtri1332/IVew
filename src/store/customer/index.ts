import {createDynamicReducer} from '@/utils/createDynamicReducer';
import {RawCustomer} from "@/store/Customer/types";

const {
    setStore,
    reducer,
    sync,
    getByKey,
    useByKey,
    setQueries,
    useKeysByQuery,
} = createDynamicReducer<RawCustomer>('customer', 'id');

export const setCustomerStore = setStore;
export const customerReducer = reducer;
export const syncCustomer = sync;
export const useCustomer = useByKey;
export const setCustomerQueries = setQueries;
export const useCustomerByQuery = useKeysByQuery;
export const getCustomer = getByKey;
