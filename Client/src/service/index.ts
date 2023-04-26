import Request from './request'
import { BASE_URL, TIME_OUT } from './request/config'

export const http = new Request({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    interceptors: {
        // 请求拦截器
        requestInterceptors: config => {
            if (config && config.headers) {
                config.headers['Content-Type'] = 'application/json;charset=UTF-8'
                if (localStorage.getItem('access_token') !== null) {
                    config.headers['Authorization'] =
                        'Bearer ' + localStorage.getItem('access_token')
                }
            }
            return config
        },
        // 响应拦截器
        responseInterceptors: response => {
            return response
        },
    }
})

// // 取消请求
// export const cancelRequest = (url: string | string[]) => {
//   return http.cancelRequest(url)
// }
// // 取消全部请求
// export const cancelAllRequest = () => {
//   return http.cancelAllRequest()
// }
