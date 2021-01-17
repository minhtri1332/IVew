import {default as axios, AxiosPromise, AxiosRequestConfig} from 'axios';
import qs from 'querystring';
import {Platform} from 'react-native';
import Core from '@/services/Core';
import ToastService from "@/services/ToastService";

class Fetch {
    handleInvalidKey?: () => any;

    private __paramsToQueryString = (params: any): string => {
        return qs.stringify(params);
    };

    private __getRequiredParams = (): Object => ({});

    __getRealUrl = (url: string): string => {
        if (url.match(/^@root/)) {
            return url.replace('@root', `https://${Core.sysUrl}`);
        }

        if (url.startsWith('@')) {
            return url.replace(/^@(\w+)(.*)/, 'https://$1.' + Core.sysUrl + '$2');
        }

        if (url.startsWith('base-')) {
            return url.replace(
                /^tinvui-(\w+):\/\/(.*)/,
                'https://$1.' + Core.sysUrl + '/$2',
            );
        }

        return url;
    };

    get(
        url: string,
        params: Object | undefined = undefined,
        config?: AxiosRequestConfig,
    ) {
        const qs = this.__paramsToQueryString(params);
        return axios.get(this.__getRealUrl(url) + (qs ? `?${qs}` : ''), config);
    }

    async post<ResponseType>(
        url: string,
        params: Object,
        config: AxiosRequestConfig = {},
    ): Promise<AxiosPromise<ResponseType>> {
        const response = await axios.post(
           url,
           params,
           {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                ...config,
            },
        );

        if (response.status != 200) {
           ToastService.show("Có lỗi xảy ra!!!")
        }

        // @ts-ignore
        return response;
    }

    async postWithToken<ResponseType>(
        url: string,
        params: Object = {},
        config: AxiosRequestConfig = {},
    ): Promise<AxiosPromise<ResponseType>> {
        const formData = new FormData();
        const requiredParams = this.__getRequiredParams();

        // @ts-ignore
        Object.keys(requiredParams).forEach((key) =>
            formData.append(key, requiredParams[key]),
        );
        // @ts-ignore
        Object.keys(params).forEach((key) => formData.append(key, params[key]));

        const response = await axios.post(this.__getRealUrl(url), formData, {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            ...config,
        });

        if (response.data && parseInt(response.data.code) === 0) {
            console.warn('Error while fetching data', {
                url: this.__getRealUrl(url),
                params,
                data: response.data,
            });

            const {message} = response.data;

            if (
                ['INVALID_OR_ERRORR', 'INVALID_OR_ERRORR', 'INVALID_OR_ERRORR'].indexOf(
                    message,
                ) >= 0 &&
                this.handleInvalidKey
            ) {
                this.handleInvalidKey();
            }

            throw new Error(response.data.message || 'Unknown Error');
        }

        // @ts-ignore
        return response;
    }
}

// Singleton
export default new Fetch();
