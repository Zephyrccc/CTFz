import exp from "constants"

export const TYPES = {
    UPDATE_USER_INFO: 'UPDATE_USER_INFO',
    EMPTY_USER_INFO: 'EMPTY_USER_INFO',
    UPDATE_TAG_LIST: 'UPDATE_TAG_LIST'
}

export interface IRootState {
    [key: string]: any
}

export interface ITeam {
    id?: number
    name?: string
    captain?: IUserInfo
    member?: Array<object>
    declare?: string
    describe?: string
    created_time?: string
}

export interface IUserInfo {
    id?: number | null
    username?: string
    password?: string
    solve_record?: Array<object>
    total_score?: number
    describe?: string
    team?: ITeam | null
}
export interface ITagItem {
    id: number
    value: string
}
export interface ICategory {
    id: number
    name: string
}
export interface IChallengeInfoState {
    tagList: Array<{
        id: number
        value: string
    }>
}

export interface IChallengeInfo {
    id?: number
    title?: string
    environment_type?: string
    category?: number
    tag?: Array<{ id: number; value: string }>
    describe?: string
    score?: number
    difficulty?: number
    attachment?: string
    created_time?: string
}

export interface ISolveRecord {
    user: IUserInfo
    challenge: IChallengeInfo
    created_time: string
}
export interface ICommentInfo {
    user: IUserInfo
    challenge: IChallengeInfo
    comment: string
    time: string
}

export interface IJoinRequestInfo {
    id: number
    user: IUserInfo
    state: boolean
    team: ITeam
    time: string
}

export interface IChallengeComment {
    user: IUserInfo
    challenge: IChallengeInfo
    content: string
    time: string
}

export interface IDefaultPagination {
    count: number
    next: string
    previous: string
}

export interface IChallengeListPagination extends IDefaultPagination {
    results: Array<IChallengeInfo>
}

export interface ITeamListPagination extends IDefaultPagination {
    results: Array<ITeam>
}

export interface IUserListPagination extends IDefaultPagination {
    results: Array<IUserInfo>
}

export interface IUserSolveRecordListPagination extends IDefaultPagination {
    results: Array<ISolveRecord>
}
export interface IChallengeCommentListPagination extends IDefaultPagination {
    results: Array<IChallengeComment>
}

export interface IContainerInfo {
    id: number
    user: number
    challenge: number
    port: number
    time_limit: number
    created_time: string
}

export interface IHost {
    name?: string
}