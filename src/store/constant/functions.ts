import {Fetch} from "@/utils/fetch";
import {RawUser, RawCustomNotify} from "@/types";
import {setUserAction} from "@/store/constant/index";
import Global from "@/utils/Global";
import SimpleToast from "react-native-simple-toast";
import ToastService from "@/services/ToastService";

export interface LoginPrams {
    userName: string,
    passWord: string,
    deviceId?: string,
    deviceType?: string
}

export const requestLogin = async (params: LoginPrams) => {
    const {data} = await Fetch.post<{
        data: RawUser;
    }>('api/Account/login', {
        ...params
    });
    if (!data) {
        return null
    }
    setUserAction(data.data);
    Global.accessToken = data.data.accessToken;
    return data.data;
};

interface ConfigProps {
    key: 'payment' | 'about' | 'version'
}

export const requestGetInfo = async (params: ConfigProps) => {
    const {data} = await Fetch.get<{ data: string }>('api/Account/GetConfig', {
        headers: {
            Authorization: 'Bearer ' + Global.accessToken
        },
        params: params
    });

    return data?.data || '';
};

export interface EditUserParams {
    userName: string,
    password: string,
    phoneNumber: string,
    name: string,
    type: number,
    address: string,
    isActive: boolean
}

export const requestEditUser = async (params: EditUserParams) => {
    const {data} = await Fetch.post('api/Account/UpdateUser', {...params}, {
        headers: {
            Authorization: 'Bearer ' + Global.accessToken
        },
    });

    if (!data || !data?.data) {
        ToastService.show(data.message)
        return null
    }

    return data?.data || null
};


export interface GetCustomNotifyParams {
    customNotifiID: string
}

export const requestGetCustomNotify = async (params: GetCustomNotifyParams) => {
    const {data} = await Fetch.get<{data: RawCustomNotify, message: string}>('api/Account/GetCustomNotification', {
        headers: {
            Authorization: 'Bearer ' + Global.accessToken
        },
        params: params
    });

    if (!data || !data?.data) {
        ToastService.show(data.message)
        return null
    }

    return data?.data || null
};
