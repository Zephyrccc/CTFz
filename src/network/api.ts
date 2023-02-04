import { IUserInfoState } from '@/types'
import { saveToken } from "@/utils"
import { http } from './index'
// export function get() {
//     return http
//         .get({
//             url: '/comments',
//             params: { 'postId': 4 }
//         })
// }

// export function post() {
//     return http
//         .get({
//             url: '/comments',
//             data: { 'postId': 4 }
//         })
// }

export const register = (user: IUserInfoState) => {
    return http.post({ url: '/register/', data: JSON.stringify(user) }).then(
        (response: any) => {
            // 注册成功保存token，获得自己的信息
            saveToken(response.data.access, response.data.refresh);
            return getUserInfo(response.data.id)
        },
        (error: any) => {
            // 注册失败
            if (error.response.status === 400) {
                return Promise.reject('用户名已存在')
            }
        })

}

export const login = (user: IUserInfoState) => {
    return http.post({
        url: '/login/', data: JSON.stringify(user),
        interceptors: {
            requestInterceptors: (config: any) => {
                console.log('接口请求成功拦截')
                return config
            },
            responseInterceptors: (response: any) => {
                console.log('接口响应成功的拦截')
                return response
            }
        }
    }).then(
        (response: any) => {
            // 登录成功保存token，获得自己的信息
            saveToken(response.data.access, response.data.refresh);
            return getUserInfo(response.data.id)
        },
        (error: any) => {
            if (error.response.status === 401) {
                return Promise.reject('用户名或密码错误')
            }
            return Promise.reject(error)
        })
}
export const getUserInfo = (id: Number) => {
    return http.get({ url: `/user/${id}` })
}

export const getTagList = () => {
    return http.get({ url: '/challenge/tag/' })
}

export const getChallengeList = () => {
    return http.get({ url: '/challenge/' })
}

export const logout = () => {
    return http.get({ url: '/logout/' })
}
export const test = () => {
    return http.get({ url: '/login/' })
}