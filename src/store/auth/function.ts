import {Fetch, updateFetchToken} from '@/utils/fetch';
import {urlProduct} from '@/store/types';

export const requestLogin = async (userName: string, pass: string) => {
  const params = JSON.stringify({
    email: userName,
    password: pass,
  });
  console.log(params)
  const {data} = await Fetch.post<{token: string}>(
    `${urlProduct}/api/v1/login`,
    params,
  );
  if (!data) {
    return null;
  }

  updateFetchToken(data.token);
  return data;
};

export const requestTokenDevice = async (token: string) => {
  const response = await Fetch.put<{token: string}>(
    `${urlProduct}/api/v1/user/set-mobile-token`,
    {mobileToken: token},
  );
  return response;
};

export const requestProfile = async () => {
  const {data} = await Fetch.get(`${urlProduct}/api/v1/user/user-detail`, {});
  return data.data.data;
};
