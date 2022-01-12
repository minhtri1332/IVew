import {Fetch, updateFetchToken} from '@/utils/fetch';
import LocaleServiceUrl, {urlProduct} from '@/store/types';

export const requestLogin = async (userName: string, pass: string) => {
  const params = JSON.stringify({
    email: userName,
    password: pass,
  });
  const {data} = await Fetch.post<{token: string}>(
    `${LocaleServiceUrl.getUrl()}/api/v1/user-management/login`,
    params,
  );

  console.log('dât', data);

  if (!data) {
    return null;
  }

  updateFetchToken(data.token);
  return data;
};

export const requestTokenDevice = async (token: string) => {
  const response = await Fetch.put<{token: string}>(
    `${urlProduct}/user-management/update-mobilFie-token`,
    {mobileToken: token},
  );
  return response;
};

export const requestProfile = async () => {
  const {data} = await Fetch.get(
    `${urlProduct}/api/v1/user-management/get-profile`,
    {},
  );
  return data.data;
};

export const requestLogout = async () => {
  const {data} = await Fetch.post(
    `${urlProduct}/api/v1/user-management/logout`,
    {},
  );
  console.log(data);
  return data.data;
};
