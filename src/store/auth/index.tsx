import {RawAuth} from '@/store/auth/types';
import {createDynamicReducer} from '@/ultils/createDynamicReducer';

const {setStore, reducer, sync, useByKey, setQueries, useKeysByQuery} =
  createDynamicReducer<RawAuth>('auth', 'id');

export const setAuthStore = setStore;
export const authReducer = reducer;
export const syncAuth = sync;
export const useAuth = useByKey;
export const setAuthQueries = setQueries;
export const useAuthByQuery = useKeysByQuery;
