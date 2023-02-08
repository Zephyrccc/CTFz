export const TYPES = {
    UPDATE_USER_INFO: "UPDATE_USER_INFO",
    EMPTY_USER_INFO: "EMPTY_USER_INFO",
    UPDATE_TAG_LIST: "UPDATE_TAG_LIST"
}

export interface IRootState {
    [key: string]: any;
}

export interface IUserInfoState {
    id?: string | number;
    username?: string;
    password?: string;
    sex?: string;
    solve_info?: Array<Number>;
}
export interface ITagItem {
    id: number;
    value: string;
}

export interface IChallengeInfoState {
    tagList: Array<{
        id: number
        value: string
    }>
}

export interface IChallengeInfo {
    id: number;
    category: number;
    title: string;
    describe: string;
    score: number;
    difficulty: number;
    tag: Array<number>;
    environment_type: string;
    have_attachment: boolean;
    attachment: string;
    created_time: string
}
