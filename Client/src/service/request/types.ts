import type {
    AxiosResponse,
    InternalAxiosRequestConfig,
    CreateAxiosDefaults,
    AxiosRequestConfig
} from 'axios'
export interface RequestInterceptors<T> {
    // 请求拦截
    requestInterceptors?: (
        config: InternalAxiosRequestConfig
    ) => InternalAxiosRequestConfig
    requestInterceptorsCatch?: (error: any) => any
    // 响应拦截
    responseInterceptors?: (response: T) => T
    responseInterceptorsCatch?: (error: any) => any
}
// 自定义传入的参数
export interface CreateRequestConfig<T = AxiosResponse>
    extends CreateAxiosDefaults {
    interceptors?: RequestInterceptors<T>
}
export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
    interceptors?: RequestInterceptors<T>
}
export interface CancelRequestSource {
    [index: string]: () => void
}
