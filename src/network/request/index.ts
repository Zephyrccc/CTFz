import axios from 'axios'
import type { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'
import type { RequestConfig, RequestInterceptors } from './types'

class Request {
  // axios 实例
  instance: AxiosInstance
  // 拦截器对象
  interceptors?: RequestInterceptors

  constructor(config: RequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    // 拦截器执行顺序 接口请求 -> 实例请求 -> 全局请求 -> 实例响应 -> 全局响应 -> 接口响应
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        if (config && config.headers) {
          config.headers['Content-Type'] = 'application/json;charset=UTF-8'
          let access = sessionStorage.getItem('access')
          config.headers['Authorization'] = access ? 'Bearer ' + access : ''
        }
        console.log('全局拦截器: 请求成功拦截')
        return config
      },
      (error: any) => {
        console.log('全局拦截器: 请求失败拦截')
        return Promise.reject(error)
      }
    )

    // 使用实例拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch,
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch,
    )
    // 全局响应拦截器保证最后执行
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log('全局拦截器：响应成功拦截')
        return response
      },
      (error: any) => {
        console.log('全局拦截器：响应失败拦截')
        return Promise.reject(error)
      }
    )
  }
  // 为单个请求添加拦截器
  request<T>(config: RequestConfig<T>): Promise<T> {
    //再次封装request方法
    return new Promise((resolve, reject) => {
      // 这里是单个请求成功的拦截器
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }
      this.instance.request<any, T>(config).then(response => {
        // 这里是单个响应成功的拦截器
        if (config.interceptors?.responseInterceptors) {
          response = config.interceptors.responseInterceptors(response)
        }
        resolve(response) //将结果返回出去
      }, error => {
        reject(error)
      })
    })
  }
  get<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  put<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' })
  }
  patch<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }

}
export default Request