// 创建axios实例 互不影响污染

import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store/index'

const instance = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 3000,
  headers: { platform: 500 }

})

// 配置 请求/响应 拦截器

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么

  // 开启loading 禁止背景点击
  Toast.loading({
    // mask: true,
    message: '加载中...',
    forbidClick: true, // 禁止多次点击
    duration: 0 // 一直存在 直到下面响应拦截器响应
  })

  // 只要有token 就在请求时携带 便于请求需要授权的接口
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token
    config.headers.platform = 'H5'
  }

  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么 默认axios把data包装了

  // 响应关闭load
  Toast.clear()
  return response.data
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 导出配置的request实例
export default instance
