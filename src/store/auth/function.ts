import LocaleServiceUrl from "@/store/types";
import { Fetch, updateFetchToken } from "@/ultils/fetch";
import { ParamCreateAccount } from "@/screens/LoginScreen/RegisterAccountScreen";
import ToastService from "@/services/ToastService";

export const requestLogin = async (userName: string, pass: string) => {
  const params = JSON.stringify({
    email: userName,
    password: pass,
  });

  const { data } = await Fetch.post<{ token: string }>(
    `${LocaleServiceUrl.getUrl()}/authentication/login`,
    params
  );

  if (!data) {
    return null;
  }

  updateFetchToken(data.token);
  return data;
};

export const requestTokenDevice = async (token: string) => {
  const response = await Fetch.put<{ token: string }>(
    `${LocaleServiceUrl.getUrl()}/user/update-firebase-token`,
    { firebase_token: token }
  );

  return response;
};

export const requestGetProfile = async () => {
  const { data } = await Fetch.put(
    `${LocaleServiceUrl.getUrl()}/user/user-profile`,
    {}
  );
  return data.data;
};

export const requestEditProfile = async () => {
  const { data } = await Fetch.get(
    `${LocaleServiceUrl.getUrl()}/user/user-profile`,
    {}
  );
  return data.data;
};

export const requestRegister = async (params: ParamCreateAccount) => {
  const paramsString = JSON.stringify(params);
  const { data } = await Fetch.post(
    `${LocaleServiceUrl.getUrl()}/authentication/register`,
    paramsString
  );
  ToastService.show(data.message);
  return data.message_code;
};

export const requestLogout = async () => {
  const { data } = await Fetch.post(
    `${LocaleServiceUrl.getUrl()}/api/v1/user-management/logout`,
    {}
  );
  return data.data;
};
