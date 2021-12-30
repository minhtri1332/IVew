import axios from 'axios';
import {Alert} from 'react-native';
import {navigateToLoginScreen} from '@/utils/navigation';
import ToastService from '@/services/ToastService';
import LocalStorageHelper from '@/services/LocalServiceHelper';

let headers = {
  Authorization: '',
  'Content-Type': 'application/json',
};

export const Fetch = axios.create({baseURL: '', headers}); // baseURL: Core.baseUrl

Fetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 500) {
      ToastService.showError(error.response.data.message, true, true, '');
      return error.response.data;
    }

    if (error.response.status === 400) {
      if (error.response.data.message === 'Mã lỗi #10000') {
        return error.response.data;
      }
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

export const logout = async (dispatch: any) => {
  Fetch.defaults.headers['Authorization'] = '';
  await LocalStorageHelper.set('password', '');
  dispatch({type: 'RESET_STORE_DATA'});
  navigateToLoginScreen();
  ToastService.show('Đăng xuất thành công');
};
