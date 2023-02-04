import Request from './request'
import { BASE_URL, TIME_OUT } from './request/config'

export const http = new Request({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    interceptors: {
        requestInterceptors: (config: any) => {
            console.log('实例请求成功拦截')
            return config
        },
        requestInterceptorsCatch: (error: any) => {
            console.log('实例请求拦截失败')
            return Promise.reject(error)
        },
        responseInterceptors: (response: any) => {
            console.log('实例响应成功的拦截')
            return response
        },
        responseInterceptorsCatch: (error: any) => {
            console.log('实例响应失败的拦截')
            return Promise.reject(error)
        }
    }
})

