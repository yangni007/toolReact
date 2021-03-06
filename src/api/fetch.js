import axios from 'axios'

import config from './index'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

var instance = axios.create();

instance.defaults.timeout = 2500;

let exportApi = {};

for(let api in config)
    exportApi[api] = function(params, otherParams) {
        
            switch(config[api].method) {
                case 'get':
                case 'delete' :
                case 'head' :
                return axios[config[api].method](config[api].url, {params, ...otherParams});
                case 'post':
                case 'put':
                case 'patch':
                return axios[config[api].method](config[api].url, params, otherParams);
                default:
                return axios[config[api].method](config[api].url, params, otherParams);
            }
        
        
        
    }


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  export default exportApi
