/*
 * @Author: Mad Dragon 395548460@qq.com
 * @Date: 2019-04-10 00:20:40
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2019-04-10 00:20:45
 * @explanatory:  api 接口 封装
 */

import config from '@/common/config/index.js'
import HttpRequest from './api'
let baseUrl = '/api';
//#ifndef H5
baseUrl = config.apiUrl.pro;
if (process.env.NODE_ENV === 'development') {
    baseUrl = config.apiUrl.dev;
}
//#endif
let api = {}
api['get'] = (url, data) => {
    //设置请求结束后拦截器
    HttpRequest.interceptor.response = (response) => {
        console.log('get个性化response....')
        //判断返回状态 执行相应操作
        return response;
    }
    return HttpRequest.get(
        url,
        data, {
            baseUrl
        }
    )
}


api['post'] = (url, data) => {
    //设置请求结束后拦截器
    HttpRequest.interceptor.response = (response) => {
        console.log('post个性化response....')
        //判断返回状态 执行相应操作
        return response;
    }
    return HttpRequest.post(
        url,
        data, {
            baseUrl
        }
    )
}
export default api;
