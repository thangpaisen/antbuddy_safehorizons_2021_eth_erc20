import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { BASE_URL } from '../utils/configs';

const instance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
});

instance.interceptors.request.use(function (config: AxiosRequestConfig) {
    const token = localStorage.getItem('USER');
    config.headers['Authorization'] = !!token ? token : '';
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    },
);
export default instance;