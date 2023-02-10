export const TYPES = {
    UPDATE_USER_INFO: "UPDATE_USER_INFO",
    EMPTY_USER_INFO: "EMPTY_USER_INFO",
    UPDATE_TAG_LIST: "UPDATE_TAG_LIST"
}

export interface IRootState {
    [key: string]: any;
}

export interface ITeam {
    id: number;
    name: string;
    captain: IUserInfo;
    member?: Array<object>;
    declare: string;
    describe: string;
    created_time: string;
}

export interface IUserInfo {
    id?: number | undefined;
    avatar?: string;
    username?: string;
    password?: string;
    sex?: string;
    solve_info?: Array<number>;
    total_score?: number;
    describe?: string;
    team?: ITeam;
}

export interface IUserInfoState extends IUserInfo { }
export interface ITagItem {
    id: number;
    value: string;
}
export interface ICategory {
    id:number;
    name:string;
}
export interface IChallengeInfoState {
    tagList: Array<{
        id: number
        value: string
    }>
}

export interface IChallengeInfo {
    id: number;
    title: string;
    environment_type: string;
    category: number;
    tag: Array<{ id: number, value: string }>;
    describe: string;
    score: number;
    difficulty: number;
    attachment: string;
    created_time: string
}


