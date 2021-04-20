import {applyMiddleware, createStore, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import {setStore} from '@/store/getStore';
import {setHistoryStore, historyReducer} from '@/store/history';
import {authReducer, setAuthStore} from '@/store/auth';
import {boxAiReducer, setBoxAiStore} from '@/store/boxAI';
import {departmentReducer, setDepartmentStore} from '@/store/department';
import {customerReducer, setCustomerStore} from '@/store/customer';
import {
  customerRecordReducer,
  setCustomerRecordStore,
} from '@/store/customerRecord';
import {
  customerGroupReducer,
  setCustomerGroupStore,
} from '@/store/customerGroups';

const middlewares: any[] = [];

// if (__DEV__) {
//   const createDebugger = require('redux-flipper').default;
//   middlewares.push(createDebugger());
// }

const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

const appReducer = combineReducers({
  history: historyReducer,
  auth: authReducer,
  boxAi: boxAiReducer,
  department: departmentReducer,
  customer: customerReducer,
  customerRecord: customerRecordReducer,
  customerGroup: customerGroupReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'RESET_STORE_DATA') {
    //Clear store state
    state = undefined;
  }

  return appReducer(state, action);
};

const persistedReducer = persistReducer(
  {
    key: 'root',
    whitelist: ['global'], // if you want to persist something, put it here
    storage: AsyncStorage,
  },
  rootReducer,
);

export const store = createStore(persistedReducer, enhancer);

export const persistor = persistStore(store);

export default store;

// set store
setStore(store);
setHistoryStore(store);
setAuthStore(store);
setBoxAiStore(store);
setDepartmentStore(store);
setCustomerStore(store);
setCustomerRecordStore(store);
setCustomerGroupStore(store);
