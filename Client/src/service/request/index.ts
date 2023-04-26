import axios, { AxiosResponse } from 'axios'
import type {
    AxiosInstance,
    AxiosError,
    InternalAxiosRequestConfig
} from 'axios'
import type {
    RequestConfig,
    RequestInterceptors,
    CreateRequestConfig
} from './types'

class Request {
    // axios 实例
    instance: AxiosInstance
    // 拦截器对象
    interceptorsObj?: RequestInterceptors<AxiosResponse>
    // * 存放取消请求控制器Map
    abortControllerMap: Map<string, AbortController>

    constructor(config: CreateRequestConfig) {
        this.instance = axios.create(config)
        // * 初始化存放取消请求控制器Map
        this.abortControllerMap = new Map()
        this.interceptorsObj = config.interceptors
        // 拦截器执行顺序 接口请求 -> 实例请求 -> 全局请求 -> 实例响应 -> 全局响应 -> 接口响应
        this.instance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                const controller = new AbortController()
                const url = config.url || ''
                config.signal = controller.signal
                this.abortControllerMap.set(url, controller)
                return config
            },
            (error: AxiosError) => Promise.reject(error)
        )

        // 使用实例拦截器
        this.instance.interceptors.request.use(
            this.interceptorsObj?.requestInterceptors,
            this.interceptorsObj?.requestInterceptorsCatch
        )
        this.instance.interceptors.response.use(
            this.interceptorsObj?.responseInterceptors,
            this.interceptorsObj?.responseInterceptorsCatch
        )
        // 全局响应拦截器保证最后执行
        this.instance.interceptors.response.use(

            (response: AxiosResponse) => {
                const url = response.config.url || ''
                this.abortControllerMap.delete(url)
                return response
            },
            (error: AxiosError) => Promise.reject(error)
        )
    }
    request<T>(config: RequestConfig<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            // 如果我们为单个请求设置拦截器，这里使用单个请求的拦截器
            if (config.interceptors?.requestInterceptors) {
                config = config.interceptors.requestInterceptors(config as any)
            }
            this.instance
                .request<any, T>(config)
                .then(response => {
                    // 如果我们为单个响应设置拦截器，这里使用单个响应的拦截器
                    if (config.interceptors?.responseInterceptors) {
                        response = config.interceptors.responseInterceptors(response)
                    }

                    resolve(response)
                })
                .catch((error: AxiosError) => {
                    reject(error)
                })
            // .finally(() => {})
        })
    }
    /**
     * 取消全部请求
     */
    cancelAllRequest() {
        for (const [, controller] of this.abortControllerMap) {
            controller.abort()
        }
        this.abortControllerMap.clear()
    }
    /**
     * 取消指定的请求
     * @param url 待取消的请求URL
     */
    cancelRequest(url: string | string[]) {
        const urlList = Array.isArray(url) ? url : [url]
        for (const _url of urlList) {
            this.abortControllerMap.get(_url)?.abort()
            this.abortControllerMap.delete(_url)
        }
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
export { RequestConfig, RequestInterceptors }
