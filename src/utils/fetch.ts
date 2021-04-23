import axios, {AxiosRequestConfig} from 'axios';
import {Core} from '@/global';
// import {setTokenAction, setUserAction} from "@/store/constant";
// import {replaceLoginScreen} from "@/utils/navigation";
import {Alert} from 'react-native';
import {navigateToLoginScreen} from '@/utils/navigation';
import ToastService from '@/services/ToastService';
import LocalStorageHelper from '@/services/LocalServiceHelper';
import {setStore} from "@/store/getStore";
import store from "@/store";

let headers = {
  Authorization: '',
  'Content-Type': 'application/json',
};

export const Fetch = axios.create({baseURL: Core.baseUrl, headers}); // baseURL: Core.baseUrl

Fetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log('error', error.response);
    if (error.response.status === 500) {
      ToastService.showError(error.response.data.message, true, true, '');
      return error.response.data;
    }

    if (error.response.status === 400) {
      ToastService.showError(error.response.data.message, true, true, '');
      return error.response.data;
    }
    if (error.response.status === 401) {
      // setTokenAction('');
      navigateToLoginScreen();
      updateFetchToken('');
      // setUserAction(null);
      Alert.alert('Token error', 'Please login again');
      return error.response.data;
    }
    return Promise.resolve({error});
  },
);

export const updateFetchToken = (_token: string) => {
  Fetch.defaults.headers['Authorization'] = `${_token}`;
};

export const logout = async () => {
  Fetch.defaults.headers['Authorization'] = '';
  await LocalStorageHelper.set('password', '');
  navigateToLoginScreen();
  ToastService.show('Đăng xuất thành công');
  setStore(store);
};
