import {applyMiddleware, createStore, combineReducers} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {setStore} from '@/store/getStore';
import {authReducer, setAuthStore} from '@/store/auth';
import {createSettingSetStore} from '@/ultils/createSetting';
import {practiceReducer, setPracticeStore} from '@/store/home';
import {composeWithDevTools} from 'redux-devtools-extension';

const middlewares: any[] = [];

// if (__DEV__) {
//   const createDebugger = require("redux-flipper").default;
//   middlewares.push(createDebugger());
// }

const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

const appReducer = combineReducers({
  auth: authReducer,
  practice: practiceReducer,
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
setAuthStore(store);
setPracticeStore(store);
