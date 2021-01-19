import axios, {AxiosRequestConfig} from 'axios';
import {Core} from "@/global";
// import {setTokenAction, setUserAction} from "@/store/constant";
// import {replaceLoginScreen} from "@/utils/navigation";
import {Alert} from "react-native";

let headers = {
    Authorization: '',
    'Content-Type': 'application/json'
};

export const Fetch = axios.create({baseURL: Core.baseUrl, headers}); // baseURL: Core.baseUrl


Fetch.interceptors.response.use((response) => {
    return response;
}, (error) => {

    if (error.response.status === 401) {
        // setTokenAction('');
        // replaceLoginScreen();
        updateFetchToken('');
        // setUserAction(null);
        Alert.alert('Token error', 'Please login again');
        return Promise.resolve({error});
    }
    return Promise.resolve({error});
});


export const updateFetchToken = (_token: string) => {
    Fetch.defaults.headers['Authorization'] = `${_token}`;
};
