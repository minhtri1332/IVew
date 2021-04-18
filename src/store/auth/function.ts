import {Fetch, updateFetchToken} from '@/utils/fetch';

export const requestLogin = async (userName:string, pass:string) => {

    const params = JSON.stringify({
        "email": userName,
        "password": pass,
    });
    console.log('data ',params)
    const {data} = await Fetch.post<{token: string}>('https://k8s.backend.dev.staging.cxview.ai/api/v1/login', params);
    console.log('data 11', data)
    if (!data) {
        return null
    }

    updateFetchToken(data.token)
    return data;
};

export const requestTokenDevice = async (token:string) => {
    const response = await Fetch.put<{token: string}>('https://go.iview.vn/api/v1/user/set-mobile-token', {mobileToken: token});
    return response;
};

export const requestProfile = async () => {
    const {data} = await Fetch.get('https://go.iview.vn/api/v1/user/user-detail', {});
    return data.data.data;
};
