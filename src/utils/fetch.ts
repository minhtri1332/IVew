import axios from 'axios';
import {Alert} from 'react-native';
import {navigateToLoginScreen} from '@/utils/navigation';
import ToastService from '@/services/ToastService';
import LocalStorageHelper from '@/services/LocalServiceHelper';
import messaging, {firebase} from '@react-native-firebase/messaging';

let headers = {
  Authorization:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9kdWN0IjoiZnIscGMsaG0sYXQsZmQsbHAiLCJlbWFpbCI6Im1kdF9hdHRlbmRlbmNlQGN4dmlldy5haSIsInVzZXJfaWQiOiI4OTU5YWZlMS1mNzljLTRiODYtYjhhYS1mY2ZhZTc5ZTA2NzIiLCJyb2xlIjoiYm9zcyIsImV4cCI6MTY0MTU0NjExNn0.7GDxviSCc-zQKNyXUW69urV6wW34eJJGwQhyyHy34FI',
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
  await messaging().deleteToken();
  navigateToLoginScreen();
  ToastService.show('Đăng xuất thành công');
};
