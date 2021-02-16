import axios, {AxiosRequestConfig} from 'axios';
import {Core} from "@/global";
// import {setTokenAction, setUserAction} from "@/store/constant";
// import {replaceLoginScreen} from "@/utils/navigation";
import {Alert} from "react-native";
import {navigateToLoginScreen} from "@/utils/navigation";

let headers = {
    Authorization: '',
    'Content-Type': 'application/json'
};

export const Fetch = axios.create({baseURL: Core.baseUrl, headers}); // baseURL: Core.baseUrl

Fetch.interceptors.response.use((response) => {
    return response;
}, (error) => {
    console.log("error", error)
    if (error.response.status === 500) {
        Alert.alert('Lỗi', 'Request failed with status code 500');
        return Promise.resolve({error});
    }
    if (error.response.status === 401) {
         // setTokenAction('');
        navigateToLoginScreen();
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
