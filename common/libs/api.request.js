/*
 * @Author: Mad Dragon 395548460@qq.com
 * @Date: 2019-04-10 00:20:40
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2019-04-10 00:20:45
 * @explanatory:  api 接口 封装
 */

import config from '@/common/config/index.js'
import {
    logOut,
	getLoginUserInfo
} from '@/common/libs/util/index.js'

import HttpRequest from './api'

let baseUrl = '/api';
//#ifndef H5
baseUrl = config.apiUrl.pro;
if (process.env.NODE_ENV === 'development') {
    baseUrl = config.apiUrl.dev;
}

//#endif
function _logOut() {
    uni.showModal({
        title: "提示",
        content: "登录超时或未登录，请重新登录",
        showCancel: false,
        success: () => {
            logOut()
        }
    });
}

function _error(title = '', msg) {
    if (process.env.NODE_ENV === 'development') {
        uni.showModal({
            title: title + " :请截图给管理员，以便快捷修复错误！",
            content: msg,
            showCancel: false
        });
    } else {
        uni.showModal({
            title: "提示",
            content: '服务异常，请稍后再试',
            showCancel: false
        });
    }
}

function _setResponse(res) {
    let _statusCode = res.statusCode;
    let title = _statusCode
    let msg = "【 地址 】：" + res.config.url
    if (res.config.data) {
        msg += "【 请求参数 】：" + JSON.stringify(res.config.data)
    }
    msg += "【 响应结果 】：" + JSON.stringify(res.data)

    switch (_statusCode) {
        case 200:
            break;
        case 401:
			// 支付宝快捷登录
			// #ifdef MP-ALIPAY
				my.getAuthCode({
				  scopes: 'auth_base',
				  success: (res) => {
					 console.log(res)
					 if(!res.authCode) {
						 console.error('用户信息获取失败')
						 return;
					 }
					 getLoginUserInfo(res)
				  },
				});
			// #endif
			// H5、微信判断是否登录
			// #ifdef H5 || MP-WEIXIN
				_logOut()
			// #endif
            break;
        case 404:
            _error("接口资源" + title, msg)
            break;
        case 500:
            _error("服务器" + title, msg)
            break;
        case 501:
            _error("服务器" + title, msg)
            break;
        case 502:
            _error("服务器" + title, msg)
            break;
        case 571:
            _error("授权失败" + title, msg)
            break;
        default:

            break;
    }
}

let api = {}

api['get'] = (url, data) => {
    //设置请求结束后拦截器
    HttpRequest.interceptor.response = (response) => {
        console.log('get个性化response....')
        //判断返回状态 执行相应操作
        _setResponse(response)
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
        _setResponse(response)
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
