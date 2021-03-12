import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken, removeToken } from './token';
import { message, Modal, notification } from 'ant-design-vue';
const request: AxiosInstance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    timeout: 6000
});
/**
 * 请求拦截
 */

request.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = getToken();
        if (token) {
            config.headers['Access-Token'] = token;
        }
        return config;
    },
    (error: any) => {
        Promise.reject(error);
    }
);
// 异常处理拦截
const errorHandle = (error: any) => {
    if (error.response.status) {
        switch (error.response.status) {
            case 500:
                notification.error({
                    message: '温馨提示',
                    description: '服务异常，请重启服务器！'
                });
                break;
            case 401:
                notification.error({
                    message: '温馨提示',
                    description: '服务异常，请重启服务器！'
                });
                break;
            case 403:
                notification.error({
                    message: '温馨提示',
                    description: '服务异常，请重启服务器！'
                });
                break;
            // 404请求不存在
            case 404:
                notification.error({
                    message: '温馨提示',
                    description: '服务异常，请重启服务器！'
                });
                break;
            default:
                notification.error({
                    message: '温馨提示',
                    description: '服务异常，请重启服务器！'
                });
        }
    }
    return Promise.reject(error.response);
};
request.interceptors.response.use((response: AxiosResponse) => {
    if (response.status === 201 || response.status === 200) {
        const { code, status, msg } = response.data;
        if (code === 401) {
            Modal.warning({
                title: 'token出错',
                content: 'token出错，请重新登陆',
                onOk: () => {
                    removeToken();
                }
            });
        } else if (code === 200) {
            if (status) {
                // 接口请求成功
                msg && message.success(msg);
                return Promise.resolve(response.data);
            }
            // 接口异常
            msg && message.warning(msg);
            return Promise.reject(response.data);
        } else {
            // 接口异常
            msg && message.warning(msg);
            return Promise.reject(response.data);
        }
    }
    return response;
}, errorHandle);
