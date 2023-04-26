import { ActionTree } from 'vuex'
import { TYPES, IRootState, IUserInfo } from '~/types'
import { getUserInfo } from '~/api'

export const actions: ActionTree<IUserInfo, IRootState> = {
    updateUserInfo({ commit }, user: number) {
        getUserInfo(user).then((response: any) => {
            commit(TYPES.UPDATE_USER_INFO, response.data)
        })
    },
    emptyUserInfo({ commit }) {
        commit(TYPES.EMPTY_USER_INFO)
        localStorage.clear()
    }
}
