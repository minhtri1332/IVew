import {Fetch, updateFetchToken} from '@/utils/fetch';

export const requestLogin = async (userName:string, pass:string) => {
    const params = JSON.stringify({
        "email": userName,
        "password": pass,
    });
    const {data} = await Fetch.post<{token: string}>('https://go.iview.vn/api/v1/login', params);

    if (!data) {
        return null
    }
    console.log('data ',data, data.token)
    updateFetchToken(data.token)
    return data;
};

export const requestTokenDevice = async (token:string) => {

    const response = await Fetch.put<{token: string}>('https://go.iview.vn/api/v1/user/set-mobile-token', {mobileToken: token});
    return response;
};
