// https://www.djamware.com/post/5fc19e3e77862f22905c7f03/ionic-5-tutorial-oauth2-login-example-vue

import axios, { AxiosError, AxiosRequestConfig } from "axios";
import {store} from '@/store';
import {TokenService} from "@/services/token.service";

const ApiService = {
    _requestInterceptor: 0,
    _401interceptor: 0,

    init(baseURL: string | undefined) {
        axios.defaults.baseURL = baseURL;
    },

    setAcceptHeader(value = 'application/json, text/plain, */*') {
        axios.defaults.headers.common['Accept'] = value
    },

    setHeader() {
        axios.defaults.headers.common["Authorization"] =
            `Bearer ${TokenService.getToken()}`;
    },

    removeHeader() {
        axios.defaults.headers.common = {};
    },

    get(resource: string) {
        return axios.get(resource);
    },

    post(resource: string, data: any) {
        return axios.post(resource, data);
    },

    put(resource: string, data: any) {
        return axios.put(resource, data);
    },

    delete(resource: string) {
        return axios.put(resource);
    },

    customRequest(data: AxiosRequestConfig) {
        return axios(data);
    },

    /* !!! Throws error?
    Property '_422interceptor' does not exist on type did you mean 401 interceptor?
    mount422Interceptor() {
        this._422interceptor = axios.interceptors.response.use(
            response => {
                return response;
            },
             error => {
                if (error.request.status === 422) {
                    store.commit('setValidationErrors', error.response.data.errors)
                    store.commit('setValidationMessage', error.response.data.message)
                } else {
                    throw error;
                }
            }
        );
    },
    */

    mount401Interceptor() {
        this._401interceptor = axios.interceptors.response.use(
            response => {
                return response;
            },
            async error => {
                if (error.request.status === 401) {
                    if (error.config.url.includes("oauth/token")) {
                        await store.dispatch("auth/signOut");
                        throw error;
                    } else {
                        try {
                            await store.dispatch("auth/refreshToken");
                            return this.customRequest({
                                method: error.config.method,
                                url: error.config.url,
                                data: error.config.data
                            });
                        } catch (e) {
                            console.log('could not refresh token')
                            await store.dispatch("auth/signOut");
                            throw error;
                        }
                    }
                }
                throw error;
            }
        );
    },

    unmount401Interceptor() {
        axios.interceptors.response.eject(this._401interceptor);
    }
};

export default ApiService;

