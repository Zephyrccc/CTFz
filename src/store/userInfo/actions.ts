import { ActionTree } from "vuex"
import { TYPES, IRootState, IUserInfoState } from "@/types"
import { logout } from '@/network/api'


export const actions: ActionTree<IUserInfoState, IRootState> = {
    updateUserInfo({ commit }, UserInfo: IUserInfoState) {
        commit(TYPES.UPDATE_USER_INFO, UserInfo)
    },
    emptyUserInfo({ commit }) {
        commit(TYPES.EMPTY_USER_INFO)
        sessionStorage.clear()
        // logout() //通知服务器
    }
}