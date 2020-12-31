import axios, {AxiosRequestConfig} from 'axios';
import {Core} from "@/global";
import Global from "@/utils/Global";

let headers = {
    Authorization: 'Bearer ' + Global.accessToken
};

export const Fetch = axios.create({headers}); // baseURL: Core.baseUrl
