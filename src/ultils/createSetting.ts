import {Store} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import {createStandardAction} from "typesafe-actions";

let store: Store | undefined;

export const setSettingsAction = createStandardAction('global/SET_SETTINGS')<{[key: string]: any}>();

export const createSetting = <T>(name: string, defaultValue: T) => {
  const selector = (state: any): T => state?.global?.[name] || defaultValue;

  const set = (value: T) => store!.dispatch(setSettingsAction({[name]: value}));

  const use = () => [useSelector<T>(selector), set] as [T, (value: T) => void];

  const get = (): T => selector(store?.getState());

  return {
    use,
    get,
    set,
    selector,
  };
};

export default createSetting;

export const createSettingSetStore = (_store: Store) => (store = _store);
