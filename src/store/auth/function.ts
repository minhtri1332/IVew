import {batch} from "react-redux";
import Fetch from '@/utils/fetch';
import {syncAuth} from "@/store/auth/index";

export const requestLogin = async (userName:string, pass:string) => {
    const params = JSON.stringify({
        "email": userName,
        "password": pass,
    });
    const {data} = await Fetch.post('https://go.iview.vn/api/v1/login', params);

    console.log("response",data)
    batch(() => {
        syncAuth([data]);
    });
    return data;
};
