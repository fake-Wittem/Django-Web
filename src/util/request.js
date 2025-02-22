// 引入axios
import axios from "axios"

// 后端url
let baseUrl = "http://localhost:8000/"
// 创建axios实例
const httpService = axios.create({
    // url前缀：'http:xxx.xxx'
    // baseURL：process.env.BASE_API
    baseURL: baseUrl,
    // 请求超时时间
    timeout: 3000
})

// 添加请求和响应拦截器
// 添加请求拦截器
httpService.interceptors.request.use(config => {
    // 在发送请求之前，请求头添加AUTHORIZATION，值为缓存中的token
    config.headers.AUTHORIZATION = window.sessionStorage.getItem('token')
    return config
}, error => {
    // 对请求错误返回错误信息
    return Promise.reject(error);
})

// 添加响应拦截器
httpService.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.reject(error)
})

/*网络请求部分*/

/*
* get请求
* url：请求地址
* params：参数
* */
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        httpService({
            url: url,
            method: 'get',
            params: params
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}

/*
* post请求
* url：请求地址
* params：参数
* */
export function post(url, params = {}) {
    return new Promise((resolve, reject) => {
        httpService({
            url: url,
            method: 'post',
            data: params
        }).then(response => {
            console.log(response)
            resolve(response)
        }).catch(error => {
            console.log(error)
            reject(error)
        })
    })
}

/*
* delete请求
* url：请求地址
* params：参数
* */
export function del(url, params = {}) {
    return new Promise((resolve, reject) => {
        httpService({
            url: url,
            method: 'delete',
            data: params
        }).then(response => {
            console.log(response)
            resolve(response)
        }).catch(error => {
            console.log(error)
            reject(error)
        })
    })
}

/*
* 文件上传
* url：请求地址
* params：参数
* */
export function fileUpload(url, params = {}) {
    return new Promise((resolve, reject) => {
        httpService({
            url: url,
            method: 'post',
            data: params,
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}

// 获取服务地址
export function getServerUrl() {
    return baseUrl
}

export default {
    get,
    post,
    del,
    fileUpload,
    getServerUrl
}