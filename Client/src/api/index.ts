import qs from 'qs'
import store from '~/store'
import { IUserInfo } from '~/types'
import { saveToken } from '~/utils'
import { http } from '~/service/index'
export const register = (user: IUserInfo) => {
    return http.post({ url: '/users/', data: JSON.stringify(user) }).then(
        (response: any) => {
            // 注册成功保存token，获得自己的信息
            saveToken(response.data.access, response.data.refresh)
            return getUserInfo(response.data.id)
        },
        (error: any) => {
            // 注册失败
            if (error.response.status === 400) {
                return Promise.reject('用户名已存在')
            }
        }
    )
}

export const login = (user: IUserInfo) => {
    return http
        .post({
            url: '/users/login/',
            data: JSON.stringify(user)
        })
        .then(
            (response: any) => {
                // 登录成功保存token，获得自己的信息
                saveToken(response.data.access_token, response.data.refresh_token)
                store.dispatch('UserInfo/updateUserInfo', response.data.id)
                return Promise.resolve()
            },
            (error: any) => {
                if (error.response.status === 401) {
                    return Promise.reject('用户名或密码错误')
                }
                return Promise.reject(error)
            }
        )
}

export const getCategoryList = () => {
    return http.get({ url: '/challenges/categorys/' })
}

export const getUserInfo = (user: number) => {
    return http.get({ url: `/users/${user}/` })
}

export const getTagList = () => {
    return http.get({ url: '/challenges/tags/' })
}

export const getUserList = (params: object = {}) => {
    return http.get({
        url: '/users/',
        params: params,
        paramsSerializer: {
            serialize: params => qs.stringify(params, { arrayFormat: 'repeat' })
        }
    })
}

export const getChallengeList = (params: object = {}) => {
    return http.get({
        url: '/challenges/',
        params: params,
        paramsSerializer: {
            serialize: params => qs.stringify(params, { arrayFormat: 'repeat' })
        }
    })
}

export const getChallengeInfo = (challenge: number) => {
    return http.get({ url: `/challenges/${challenge}/` })
}

export const getTeamList = (params: object = {}) => {
    return http.get({
        url: '/teams/',
        params: params,
        paramsSerializer: {
            serialize: params => qs.stringify(params, { arrayFormat: 'repeat' })
        }
    })
}

export const getTeamInfo = (user: number) => {
    return http.get({ url: `/teams/${user}/` })
}


export const changeTeamInfo = (team: number, declare: string, describe: string) => {
    return http.patch({
        url: `/teams/${team}/`,
        data: JSON.stringify({ declare: declare, describe: describe })
    })
}


export const getApplicationTeamRequestList = () => {
    return http.get({
        url: '/teams/applications/',
    })
}

export const getChallengeCommentList = (challenge: number, page = 1) => {
    return http.get({
        url: '/challenges/comments/',
        params: { challenge: challenge, page: page },
        paramsSerializer: {
            serialize: params => qs.stringify(params, { arrayFormat: 'repeat' })
        }
    })
}

export const addChallengeComment = (user: number, challenge: number, content: string) => {
    return http.post({
        url: '/challenges/comments/',
        data: JSON.stringify({ user: user, challenge: challenge, content: content })
    })
}

export const getContainer = () => {
    return http.get({
        url: '/docker/',
    })
}

export const addContainer = (user: number, challenge: number) => {
    return http.post({
        url: '/docker/',
        data: JSON.stringify({ user: user, challenge: challenge })
    })
}

export const removeContainer = (container: number | undefined) => {
    return http.delete({
        url: `/docker/${container}/`
    })
}

export const submitFlag = (user: number, challenge: number, flag: string) => {
    return http.post({
        url: '/flag/',
        data: JSON.stringify({ user: user, challenge: challenge, flag: flag })
    })
}

export const logout = () => {
    return http.get({ url: '/logout/' })
}

export const getUserSolveRecordList = (user: number, page = 1) => {
    return http.get({
        url: '/challenges/solves/',
        params: { user: user, page: page },
        paramsSerializer: {
            serialize: params => qs.stringify(params, { arrayFormat: 'repeat' })
        }
    })
}

export const getUserfailRecordList = (user: number, page = 1) => {
    return http.get({
        url: '/challenges/fails/',
        params: { user: user, page: page },
        paramsSerializer: {
            serialize: params => qs.stringify(params, { arrayFormat: 'repeat' })
        }
    })
}

export const applicationTeam = (user: number, team: number) => {
    return http.post({
        url: '/teams/applications/',
        data: JSON.stringify({ user: user, team: team })
    })
}

export const operateApplication = (application: number, status: number) => {
    return http.patch({
        url: `/teams/applications/${application}/`,
        data: JSON.stringify({ status: status })
    })
}

export const dismissalMember = (user: number) => {
    return http.delete({ url: `/teams/members/${user}/` })
}

export const transferCaptain = (user: number) => {
    return http.patch({ url: `/teams/members/${user}/` })
}

export const createTeam = (
    captain: number,
    name: string,
    declare: string,
    describe: string
) => {
    return http.post({
        url: '/teams/',
        data: JSON.stringify({
            captain: captain,
            name: name,
            declare: declare,
            describe: describe
        })
    })
}

export const changePassword = (
    user: number,
    old_password: string,
    new_password: string
) => {
    return http.post({
        url: `/users/${user}/password/`,
        data: JSON.stringify({
            old_password: old_password,
            new_password: new_password
        })
    })
}

export const changeUserInfo = (user: number, describe: string) => {
    return http.patch({
        url: `/users/${user}/`,
        data: JSON.stringify({ describe: describe })
    })
}


export const getHost = (host: number = 1) => {
    return http.get({
        url: `/host/${host}/`
    })
}