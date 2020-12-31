import {createSlice, createAction, PayloadAction, Store} from '@reduxjs/toolkit'
import {createStore, combineReducers} from 'redux'
import {useSelector} from "react-redux";

interface RawUser {

}

const initialState: RawUser | null = null;
const initialOneSignal: string = '';

const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<any>) => {
            if (action.payload) {
                return {
                    ...action.payload
                }
            }
            return null
        },
    }
});

const notSeen = createSlice({
    name: 'notSeen',
    initialState: 0,
    reducers: {
        setNotifySeen: (state, action: PayloadAction<any>) => {
            return action.payload
        },
    }
});

const oneSignal = createSlice({
    name: 'oneSignalId',
    initialState: initialOneSignal,
    reducers: {
        setOneSignalId: (state, action: PayloadAction<string>) => {
            return action.payload
        },
    }
});

export const constantReducer = combineReducers({
    user: user.reducer,
    notSeen: notSeen.reducer,
    oneSignalId: oneSignal.reducer,
});

let _store: Store | undefined;

export const constantSetStore = (store: Store) => {
    _store = store;
};

export const setUserAction = (data: RawUser | null) => {
    _store && _store.dispatch(user.actions.setUser(data))
};

export const setOneSignalIdAction = (data:string) => {
    _store && _store.dispatch(oneSignal.actions.setOneSignalId(data))
};

export const useUser = () => {
    return useSelector(state => {
        return state.constant.user
    });
};


export const useOneSignalUserId = () => {
    return useSelector(state => {
        return state.constant.oneSignalId
    });
};


export const setNofitySeenAction = (data: number) => {
    _store && _store.dispatch(notSeen.actions.setNotifySeen(data))
};

//@ts-ignore
export const useNotifySeen = () => {
    return useSelector(state => {
        return state.constant.notSeen
    });
};
