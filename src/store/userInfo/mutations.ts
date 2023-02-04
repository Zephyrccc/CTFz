import { MutationTree } from "vuex"
import { IUserInfoState, TYPES } from "@/types"


export const mutations: MutationTree<IUserInfoState> = {
  [TYPES.UPDATE_USER_INFO]: (state, UserInfo: IUserInfoState) => {
    state.id = UserInfo.id
    state.username = UserInfo.username
    state.sex = UserInfo.sex
    state.solve_info = UserInfo.solve_info
  },
  [TYPES.EMPTY_USER_INFO]: (state) => {
    state.id = ''
    state.username = ''
    state.sex = ''
    state.solve_info = []
  }
}